import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import knotebookLogo from '../assets/knotebook.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="nav-container">
      <h1 className="nav-heading">
        <Link to="/">
          <img src={knotebookLogo} alt="Knotebook" style={{ height: '40px' }} />
        </Link>
      </h1>
      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="nav-toggle-icon">&#9776;</span>
      </button>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/editor" className="nav-link" onClick={() => setMenuOpen(false)}>
          Editor
        </Link>
        <Link to="/notes" className="nav-link" onClick={() => setMenuOpen(false)}>
          Notes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
