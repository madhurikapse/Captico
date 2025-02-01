import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Courses from './component/Course';
import Navbar from './component/Navbar';

const App = () => {
    return (
      <>
        <Routes>
            
           <Route path="/" element={<Navbar/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
        </Routes>
        </>
    );
};

export default App;
