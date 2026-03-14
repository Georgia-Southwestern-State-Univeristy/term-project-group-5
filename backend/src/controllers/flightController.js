const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

const getFlightOffers = async (req, res) => {
  const { originCode, destinationCode, departureDate, adults } = req.body;

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: departureDate,
      adults: adults || '1',
      // this is to limit results
      max: 10 
    });

    // AMADEUS DICTIONARY: Map carrier codes to names
    const carriers = response.result.dictionaries.carriers;

    const cleanedOffers = response.data.map(offer => ({
      id: offer.id,
      airline: carriers[offer.itineraries[0].segments[0].carrierCode],
      airlineCode: offer.itineraries[0].segments[0].carrierCode,
      price: {
        total: offer.price.total,
        currency: offer.price.currency
      },
      duration: offer.itineraries[0].duration.replace('PT', '').toLowerCase(),
      numberOfBookableSeats: offer.numberOfBookableSeats,
      segments: offer.itineraries[0].segments.map(seg => ({
        departure: seg.departure,
        arrival: seg.arrival,
        blacklistedInEU: seg.blacklistedInEU,
        stops: seg.numberOfStops
      }))
    }));

    res.status(200).json(cleanedOffers);
  } catch (error) {
    console.error("Amadeus Error:", error);
    res.status(500).json({ message: "Failed to fetch flight data", error: error.code });
  }
};

module.exports = { getFlightOffers };