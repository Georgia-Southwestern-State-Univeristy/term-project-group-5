import axios from 'axios';

export async function getFlightOffers  (req, res) {
  // 1. Get info from your React frontend
  const { originCode, destinationCode, departureDate } = req.body;

  try {
    // 2. Setup the request to Flights Sky
    const options = {
      method: 'GET',
      url: 'https://flights-sky.p.rapidapi.com/flights/search-one-way', 
      params: {
        fromEntityId: originCode, 
        toEntityId: destinationCode,
        departDate: departureDate,
        currency: 'USD'
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

