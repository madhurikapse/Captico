import express from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controller/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCourses).post(protect, createCourse);
router.route("/:id").get(getCourseById).put(protect, updateCourse).delete(protect, deleteCourse);

export default router;
