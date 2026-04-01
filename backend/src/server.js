//import express from 'express';
//import notesRoutes from './routes/notesRoutes.js';
//import attributeRoutes from './routes/attributeRoutes.js';
//import destinationRoutes from './routes/destinationRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
//import { v4 as uuidv4 } from 'uuid';
//import { globalErrorHandler } from './middleware/errorMiddleware.js';
import app from "./app.js";

dotenv.config();

//const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

//middleware
/*app.use(express.json());

app.use((req, res, next) => {
  req.requestId = uuidv4();
  next();
});

app.use('/api/notes/', notesRoutes);
app.use('/api/attributes/', attributeRoutes);
app.use('/api/search/', destinationRoutes);

app.use(globalErrorHandler);*/
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "UP", 
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on PORT: ', PORT);
});

