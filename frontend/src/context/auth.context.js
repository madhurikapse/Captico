import axios from "axios";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // You can use login function here to store token
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);  // Save token in localStorage
      setToken(token);  // Set token in state
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
