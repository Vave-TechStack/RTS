import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import About from "./pages/About us";
import UserPage from "./pages/userpage";
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Services from './pages/services';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route — home page */}
          <Route path="/" element={<Home />} />

          {/* Login page route */}
          <Route path="/login" element={<Login />} />
          {/* About Page*/}
          <Route path="/about" element={<About />} /> 
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/Services" element={<Services />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
