import express from 'express';
import usersController from '../controllers/usersController.mjs';

const router = express.Router();

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.udpateUser)
  .delete(usersController.deleteUser);

export default router;
