import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Change 5000 to your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;