import { Routes, Route } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import PrivateRoute from "./component/PrivateRoute";
import Courses from "./page/Course";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./context/auth.context";

const App = () => {
  return (
    <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/courses" element={<PrivateRoute><Courses/></PrivateRoute>} />
        </Routes>
      
    </AuthProvider>
  );
};

export default App;
