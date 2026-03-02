import express from 'express';
import {
  getAttributes,
  createAttribute,
  deleteAttribute
} from '../controllers/attributesController.js';

const router = express.Router();

router.get('/', getAttributes);
// router.get('/:id', getNoteById);
router.post('/', createAttribute);
// router.put('/:id', updateNote);
 router.delete('/:id', deleteAttribute);

export default router;
