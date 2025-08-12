import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-green-700 text-white shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">🌱 Digital Garden</Link>
      </h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/editor" className="hover:underline">
          Editor
        </Link>
        <Link to="/graph" className="hover:underline">
          Graph
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
