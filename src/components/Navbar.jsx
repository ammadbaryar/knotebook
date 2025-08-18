import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import knotebookLogo from '../assets/knotebook.png';

const Navbar = () => {
  return (
    <nav className="nav-container">
      <h1 className="nav-heading">
        <Link to="/">
          <img src={knotebookLogo} alt="Knotebook" style={{ height: '40px' }} />
        </Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
