import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from './routes/auth.js';
import courseRoutes from './routes/course.js';
// Load environment variables at the top
dotenv.config();



// Initialize Express app
const app = express();

// Middlewares
app.use(cookieParser());
app.use(morgan("combined"));
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"], // Adjust the origin for production
}));
app.use(express.json());

// Route for basic test
app.get("/", (req, res) => {
  res.send("working.");
});


app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected."))
  .catch((err) => {
    console.error("DB connection error:", err); // Log any DB connection issues
    process.exit(1); // Exit the process if DB connection fails
  });

// Generic error handler (for unhandled errors)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); // Log the error
  res.status(500).send({ error: 'Internal server error' }); // Return a 500 error for unhandled errors
});

// Start server
app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
});