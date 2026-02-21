import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import attributeRoutes from './routes/attributeRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

//middleware
app.use(express.json());
app.use('/api/notes/', notesRoutes);
app.use('/api/attributes/', attributeRoutes);
//app.use("/api/product", productRoutes)

app.listen(PORT, () => {
  console.log('Server running on PORT: ', PORT);
});

//app.listen(5001, "0.0.0.0", () => {
//  console.log("Server running");
//});
