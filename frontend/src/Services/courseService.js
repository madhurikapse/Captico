import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const getCourses = async () => {
  const response = await axios.get(`${API_URL}courses`);
  return response.data;
};

export const createCourse = async (courseData, token) => {
  const response = await axios.post(`${API_URL}courses`, courseData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const updateCourse = async (id, courseData, token) => {
  const response = await axios.put(`${API_URL}courses/${id}`, courseData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const deleteCourse = async (id, token) => {
  const response = await axios.delete(`${API_URL}courses/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
