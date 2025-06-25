import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectToDatabase();

// Routes
app.use("/api/products", productRoutes);

// Server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
