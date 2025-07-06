import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// ✅ Proper CORS config for cookies and credentials
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // allow cookies and headers
  })
);

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to MongoDB
await connectToDatabase();

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
