import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import About from "./pages/About us";
import UserPage from "./pages/userpage";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
