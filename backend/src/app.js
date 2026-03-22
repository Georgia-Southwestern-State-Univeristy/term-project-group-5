import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import { v4 as uuidv4 } from "uuid";
import { globalErrorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.use(express.json());

// Request ID middleware
app.use((req, res, next) => {
  req.requestId = uuidv4();
  next();
});

// Routes
app.use("/api/notes", notesRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/search", destinationRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/auth", authRoutes);

// Global error handler
app.use(globalErrorHandler);

export default app;