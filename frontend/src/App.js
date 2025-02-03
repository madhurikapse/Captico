import { Routes, Route } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import PrivateRoute from "./component/PrivateRoute";
import Courses from "./page/Course";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./context/auth.context";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<PrivateRoute><Courses/></PrivateRoute>}/>
        
        <Route path="/courses" element={<Courses/>}/>

      </Routes>
    </AuthProvider>
  );
};

export default App;
