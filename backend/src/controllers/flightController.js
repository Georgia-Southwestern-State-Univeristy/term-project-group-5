import axios from 'axios';

export async function getFlightOffers  (req, res) {
  // 1. Get info from your React frontend
  const { originCode, destinationCode, departureDate, returnDate, adults} = req.body;
  if (!originCode || !destinationCode || !departureDate || !returnDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (typeof originCode !== "string" || typeof destinationCode !== "string") {
    return res.status(400).json({ message: "Invalid airport codes" });
  }

  if (adults && (isNaN(adults) || adults < 1)) {
    return res.status(400).json({ message: "Invalid number of travelers" });
  }

  if (returnDate < departureDate) {
    return res.status(400).json({ message: "Return date must be after departure date" });
  }
  try {
    // 2. Setup the request to Flights Sky
    const options = {
      method: 'GET',
      url: 'https://flights-sky.p.rapidapi.com/flights/search-roundtrip', 
      params: {
        fromEntityId: originCode.toUpperCase(),
        toEntityId: destinationCode.toUpperCase(),
        departDate: departureDate, // YYYY-MM-DD
        returnDate: returnDate,    // MANDATORY for this endpoint
        currency: 'USD',
        adults: adults
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
      }
    };

    // 3. Execute the search
    const response = await axios.request(options);
    
    // 4. Data Extraction (Path depends on the exact JSON structure of Flights Sky)
    const rawFlights = response.data.data?.itineraries || [];

    // 5. Transform for your Frontend (Matching your API Contract)
    const cleanedOffers = rawFlights.map(flight => ({
      id: flight.id,
      airline: flight.legs[0].carriers.marketing[0].name,
      price: {
        total: flight.price.raw,
        currency: "USD"
      },
      duration: `${Math.floor(flight.legs[0].durationInMinutes / 60)}h ${flight.legs[0].durationInMinutes % 60}m`,
      segments: flight.legs[0].segments.map(s => ({
        departure: { iataCode: s.origin.displayCode, at: s.departure },
        arrival: { iataCode: s.destination.displayCode, at: s.arrival },
        numberOfStops: flight.legs[0].stopCount
      }))
    }));

    res.status(200).json(cleanedOffers);

  } catch (error) {
    console.error("Flight Search Error:", error.message);
    res.status(502).json({ message: "Error fetching flights from provider" });
  }
};

