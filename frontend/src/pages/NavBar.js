import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_id.png"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="navbar">
      {/* Logo */}
        <div className="logo"> <Link to="/"> <img src={logo} alt="Logo" style={{ width: "100px" }} /> </Link> </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <ul className="menu">
          <li className="dropdown-item">
            <a href="#!" className="nav-link" onClick={() => toggleDropdown("why")}>
              Why RTS{" "}
              <span className="arrow">{openDropdown === "why" ? "▴" : "▾"}</span>
            </a>
            {openDropdown === "why" && (
              <ul className="dropdown-menu">
                <li><a href="/about">About Us</a></li>
                <li><a href="/userpage">Our Values</a></li>
              </ul>
            )}
          </li>

          <li className="dropdown-item">
            <a href="/Services" className="nav-link" onClick={() => toggleDropdown("solutions")}>
              Services{" "}
              {/* <span className="arrow">{openDropdown === "solutions" ? "▴" : "▾"}</span> */}
            </a>
            {/* {openDropdown === "solutions" && ( <ul className="dropdown-menu"> <li><a href="#!">Rise To Scale</a></li> </ul> )} */}
          </li>

          <li> <a href="#!" className="nav-link">Success Stories</a> </li>

          <li className="dropdown-item">
            <a href="#!" className="nav-link" onClick={() => toggleDropdown("resources")}>
              Resources{" "}
              {/* <span className="arrow">{openDropdown === "resources" ? "▴" : "▾"}</span> */}
            </a>
            {/* {openDropdown === "resources" && ( <ul className="dropdown-menu"> <li><a href="#!">Our Team</a></li> <li><a href="#!">Guides</a></li> </ul> )} */}
          </li>
            <li> <a href="#!" className="nav-link">Our Team</a> </li>
          {/* --- LOGIN BUTTON --- */}
          <li>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
