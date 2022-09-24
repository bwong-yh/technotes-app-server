import express from 'express';
import usersController from '../controllers/usersController.mjs';

const router = express.Router();

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser);

router
  .route('/:username')
  .patch(usersController.udpateUser)
  .delete(usersController.deleteUser);

export default router;
