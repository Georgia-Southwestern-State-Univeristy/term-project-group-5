import User from '../models/User.js';
import jwt  from 'jsonwebtoken';
import { logInfo } from '../../utils/logger.js';

export async function logInUser(req, res, next){
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        // Create Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
  
        res.json({ token, email: user.email });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      next(error);
    }
  };
export async function registerUser(req, res, next){
    const { email, password } = req.body;

    try {
      if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must include letters and numbers",
      });
    }
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = await User.create({
        email,
        password_hash: password 
      });
  
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
  
        res.status(201).json({
          _id: user._id,
          email: user.email,
          token: token,
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      next(error);
    }
};