import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import { v4 as uuidv4 } from "uuid";
import { globalErrorHandler } from "./middleware/errorMiddleware.js";

const app = express();

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

// Global error handler
app.use(globalErrorHandler);

export default app;