import jwt  from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust path to your User model

export async function protect(req, res, next)  {
  let token;

  // 1. Check if token exists in the Authorization header (Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach user to the request object (excluding password)
      // This is the "magic" step that creates req.user
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next function (the actual route)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export function admin(req, res, next){
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  };