import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <header className="nav-root">
      <div className="nav-inner">

        {/* BRAND */}
        <div className="brand">
          <span className="brand-icon">🍽️</span>
          <Link to="/" className="brand-name">Trio Delights</Link>
        </div>

        {/* DESKTOP LINKS */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
          <Link to="/book" onClick={() => setOpen(false)}>Book</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="nav-toggle" onClick={() => setOpen(!open)}>
          <div className={`bar ${open ? "open" : ""}`}></div>
          <div className={`bar ${open ? "open" : ""}`}></div>
          <div className={`bar ${open ? "open" : ""}`}></div>
        </div>

      </div>
    </header>
  );
}
