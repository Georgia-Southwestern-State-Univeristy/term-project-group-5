import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  getFlightOffers, saveFlight, getSavedFlights
} from '../controllers/flightController.js';
import { protect, admin }from '../middleware/authMiddleware.js';

const router = express.Router();

// NEW: Rate Limiter
const flightLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: {
    message: "Too many requests, please try again later."
  }
});

// Apply limiter ONLY to flight search endpoint
router.post('/search',protect, flightLimiter, getFlightOffers);
router.post('/save',protect, saveFlight);
router.get('/saved', protect, getSavedFlights);

export default router;