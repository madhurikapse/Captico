import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Tasklist from './components/TaskList';
import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvents';
function App() {
  return (
    <div className="App">
     
      <Navbar/>
      
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/CreateEvent' element={<CreateEvent/>}/>
        <Route  path='/all-tasks' element={<Tasklist/>}/>
      </Routes>
    </div>
  );
}

export default App;