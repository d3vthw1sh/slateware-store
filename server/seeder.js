import mongoose from "mongoose";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();
await connectToDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedProducts();
