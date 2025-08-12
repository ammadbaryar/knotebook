// layouts/MainLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <header className="header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/editor">Editor</Link>
          <Link to="/diagram">Diagram</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/search">Search</Link>
        </nav>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}
