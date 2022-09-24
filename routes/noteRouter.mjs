import express from 'express';
import notesController from '../controllers/notesController.mjs';

const router = express.Router();

router
  .route('/')
  .get(notesController.getAllNotes)
  .post(notesController.createNote);

export default router;
