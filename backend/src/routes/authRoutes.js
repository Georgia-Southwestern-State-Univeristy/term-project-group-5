import express from 'express';
import {
    logInUser,
    registerUser
  } from '../controllers/authController.js';


const router = express.Router();


router.post('/login', logInUser);
router.post('/register', registerUser);

export default router;
