import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get('http://localhost:5000/api/courses');
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <CourseForm />
      <CourseList courses={courses} />
    </div>
  );
};

export default Dashboard;
