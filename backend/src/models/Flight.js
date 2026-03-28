import mongoose from 'mongoose';

const flightSegmentSchema = new mongoose.Schema({
  departure: {
    iataCode: { type: String, required: true },
    at: { type: Date, required: true } // Mongoose handles ISO strings as Dates
  },
  arrival: {
    iataCode: { type: String, required: true },
    at: { type: Date, required: true }
  },
  numberOfStops: { type: Number, default: 0 }
});

const savedFlightSchema = new mongoose.Schema({
  // Link flight to a specific user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The unique ID from the Flight Scraper Sky API
  flightId: {
    type: String,
    required: true
  },
  airline: { type: String, required: true },
  price: {
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  duration: { type: String }, // "12h 25m"
  segments: [flightSegmentSchema], // Array of sub-documents
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Optional: Ensure a user can't save the exact same flight ID twice
savedFlightSchema.index({ userId: 1, flightId: 1 }, { unique: true });

const SavedFlight = mongoose.model('SavedFlight', savedFlightSchema);

export default SavedFlight;