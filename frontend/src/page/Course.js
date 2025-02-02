import { useState, useEffect } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("http://localhost:5000/api/courses");
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.name} - {course.instructor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
