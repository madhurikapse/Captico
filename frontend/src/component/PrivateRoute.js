import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

// PrivateRoute component checks if user is authenticated
const PrivateRoute = ({ children }) => {
  const { token } = useAuth(); // Get the token from context

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // If token exists, render children (e.g., /courses)
};

export default PrivateRoute;
