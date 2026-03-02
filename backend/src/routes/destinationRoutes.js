import express from 'express';
import {
  getDestinations,
  createDestination,
  deleteDestination,
  updateDestination,
  searchDestinations
} from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', getDestinations);
router.post('/create', createDestination);
router.post('/', searchDestinations);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;