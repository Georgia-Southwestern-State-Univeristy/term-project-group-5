import express from 'express';
import {
  getDestinations,
  createDestination,
  deleteDestination,
  updateDestination
} from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', getDestinations);
router.post('/', createDestination);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;
