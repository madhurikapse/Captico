import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Api from "../AxiosConfig";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Fixed toggle logic
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (userData.email && userData.password) {
        const response = await Api.post("/auth/login", userData); // Fixed API call

        if (response.data.success) {
          dispatch({ type: "LOGIN", payload: response.data.userData }); // Ensure correct payload
          setUserData({ email: "", password: "" });
          navigate("/");
          toast.success(response.data.message);
        } else {
          toast.error(response?.data?.error || "Login failed.");
        }
      } else {
        toast.error("All fields are mandatory.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed. Please try again.");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <label>Email:</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={userData.email}
          required
        />

        <label>Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="password"
            value={userData.password}
            required
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input type="submit" value="Login" className="btn-login" />
      </form>

      <button onClick={() => navigate("/register")} className="register-btn">
        Register?
      </button>
    </div>
  );
};

export default Login;
