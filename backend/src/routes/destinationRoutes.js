import express from 'express';
import {
  getDestinations,
  createDestination,
  deleteDestination,
  updateDestination,
  searchDestinations
} from '../controllers/destinationController.js';
import { protect, admin }from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDestinations);
router.post('/create', protect, admin, createDestination);
router.post('/', searchDestinations);
router.put('/:id',protect, admin, updateDestination);
router.delete('/:id',protect, admin, deleteDestination);

export default router;