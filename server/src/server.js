import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDatabase } from "./config/db.js";
import { enableDemoMode, isDemoModeEnabled } from "./config/storage.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "API is running.",
    storage: isDemoModeEnabled() ? "demo" : "mongo"
  });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("Connected to MongoDB.");
  } catch (error) {
    enableDemoMode();
    console.warn("Database connection failed. Starting in demo mode:", error.message);
  }

  app.listen(port, () => {
    const storage = isDemoModeEnabled() ? "demo data" : "MongoDB";
    console.log(`Server listening on port ${port} using ${storage}`);
  });
};

startServer();