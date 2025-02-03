import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes.js";  // Ensure this is correct
import authRoutes from "./routes/auth.route.js";  // If you have auth routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  // Ensure you use body-parser or express.json() for parsing JSON requests

// Use the routes
app.use("/api/courses", courseRoutes);  // This mounts the course routes under `/api/courses`
app.use("/api/auth", authRoutes);  // If you have authentication routes

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
