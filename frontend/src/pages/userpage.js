import React, { useState } from "react";
import "./userpage.css";
import Navbar from "./NavBar";

function UserPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="user-page">
      {/* Navbar at top */}
      <Navbar />
      <br />
      <br />
      <div className="tabs">
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
        <button onClick={() => setActiveTab('courses')}>Courses</button>
      </div>
      <div className="content">
        {activeTab === "dashboard" && (
          <div className="dashboard">
            <h3>Welcome Back!</h3>
            <p>This is your home dashboard.</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile">
            <h3>User Profile</h3>
            <p><strong>Name:</strong> Venkat</p>
            <p><strong>Email:</strong> venkat@example.com</p>
            <p><strong>Role:</strong> Full Stack Developer</p>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="courses">
            <h3>My Courses</h3>
            <ul>
              <li>React Basics</li>
              <li>Node.js Fundamentals</li>
              <li>Database Management</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
