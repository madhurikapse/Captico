import express from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controller/courseController.js";
import { protect } from "../middleware/authMiddleware.js";  // Middleware to protect routes

const router = express.Router();
 // GET all courses, POST to create a new course
router.route("/").get(getCourses);  // GET all courses

// Routes for a specific course by ID
router.route("/:id")
  .get(getCourseById)  // GET course by ID
  .put(protect, updateCourse)  // PUT to update course by ID
  .delete(protect, deleteCourse);  // DELETE 
export default router;
