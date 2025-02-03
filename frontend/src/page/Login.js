import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";  
import "../style/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);

      // Debugging: Check if token is saved to localStorage
      console.log("Token saved:", localStorage.getItem("token"));

      toast.success("Login successful!");
      alert("Login successfully!");

      // Redirect to /courses if login is successful
      navigate("/courses");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default Login;
