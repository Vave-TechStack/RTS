import React, { useState } from "react";
import "./Login.css";
import Navbar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(`Email: ${email}, Password: ${password}`);
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // important if you're using cookies
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem('token', data.token);


      const decoded = jwtDecode(data.token);
      console.log('Decoded token:', decoded);
      // const role = "admin"
      const role = "student"
      if (role === "admin") {
        navigate('/dashboard'); // 👈 Route to protected/dashboard page
      } else {
        navigate('/userpage');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      {/* Navbar at top */}
      <Navbar />

      {/* Login form */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
