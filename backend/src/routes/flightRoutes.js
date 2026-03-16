import express from 'express';
import {
    getFlightOffers
} from '../controllers/flightController.js';

const router = express.Router();
router.post('/search', getFlightOffers);

export default router;