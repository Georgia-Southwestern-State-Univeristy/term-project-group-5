import axios from 'axios';
import SavedFlight from '../models/Flight.js';

export async function getFlightOffers  (req, res) {
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

    const response = await axios.request(options);
    
    const rawFlights = response.data.data?.itineraries || [];

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

export async function saveFlight (req, res) {
  try {

    // 1. Validation: Ensure all required fields are present
    if (!req.body.id || !req.body.airline || !req.body.price) {
      return res.status(400).json({ message: "Missing required flight data." });
    }

    // 2. Creation: Create the new document
    // Note: req.user.id comes from your protect/auth middleware
    const newSavedFlight = new SavedFlight({
      userId: req.user._id, // Ensure this matches your Middleware attachment
      flightId: req.body.id,
      airline: req.body.airline,
      price: req.body.price,
      duration: req.body.duration,
      segments: req.body.segments
    });

    // 3. Persistence: Save to MongoDB
    const saved = await newSavedFlight.save();

    res.status(201).json({
      message: "Flight saved successfully!",
      data: saved
    });

  } catch (error) {
    // 4. Error Handling: Check for duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "You have already saved this flight to your profile." 
      });
    }

    console.error("Error saving flight:", error);
    res.status(500).json({ message: "Server error while saving flight." });
  }
};

