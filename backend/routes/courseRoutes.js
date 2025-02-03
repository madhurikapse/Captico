import express from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controller/courseController.js";
import { protect } from "../middleware/authMiddleware.js";  // Middleware to protect routes

const router = express.Router();

// Route to get all courses
router.route("/").get(getCourses).post(protect, createCourse);  // GET all courses, POST to create a new course

// Routes for a specific course by ID
router.route("/:id")
  .get(getCourseById)  // GET course by ID
  .put(protect, updateCourse)  // PUT to update course by ID
  .delete(protect, deleteCourse);  // DELETE course by ID

export default router;
