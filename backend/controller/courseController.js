import Course from "../model/Course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();  // This should return an array of courses
    console.log(courses); // Check what the output is
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses available" });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};


// Controller function to get a single course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;  // Get course ID from request params
  try {
    const course = await Course.findById(id);  // Fetch course by ID
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);  // Send course data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createCourse = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = new Course({
      name,
      description,
      price,
    });

    await newCourse.save();  // Save the new course to the database
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Controller function to update an existing course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.name = name || course.name;
    course.description = description || course.description;
    course.price = price || course.price;

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;  // Get course ID from request params
  try {
    const course = await Course.findById(id);  // Find course by ID
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Remove course from the database
    await course.remove();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
