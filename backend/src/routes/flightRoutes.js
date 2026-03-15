import express from 'express';
import {
    getFlightOffers
} from '../controllers/flightController.js';

const router = express.Router();
router.get('/search', getFlightOffers);

export default router;