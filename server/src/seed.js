import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import { sampleProducts } from "./data/products.js";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDatabase();
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Sample products seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
