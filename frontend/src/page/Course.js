import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth(); // Ensure you're getting the token

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("Response Status:", response.status);  // Log response status
        console.log("Data:", response.data);  // Log the courses data
    
        if (response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
          console.log("No courses found in the response");
        }
      } catch (error) {
        console.error("Error fetching courses:", error.response ? error.response.data : error);
      }
    };
    

    if (token) {
      fetchCourses();
    }
  }, [token]);

  if (courses.length === 0) {
    return <p>No courses available</p>;
  }

  return (
    <div>
      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
