import express from 'express';
import {
  getAttributes,
  createAttribute,
  deleteAttribute
} from '../controllers/attributesController.js';
import { protect, admin }from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAttributes);
// router.get('/:id', getNoteById);
router.post('/',protect, admin, createAttribute);
// router.put('/:id', updateNote);
 router.delete('/:id',protect, admin, deleteAttribute);

export default router;
