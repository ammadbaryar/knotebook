import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-container">
      <h1 className="nav-heading">
        <Link to="/">🌱 Digital Garden</Link>
      </h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/editor" className="nav-link">
          Editor
        </Link>
        <Link to="/notes" className="nav-link">
          Notes
        </Link>
        <Link to="/search" className="nav-link">
          Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
