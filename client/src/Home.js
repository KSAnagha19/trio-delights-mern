import React from "react";
import Navbar from "./components/Navbar";
import "./Home.css";

// Import hero image
import hero from "./assets/hero.jpg";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="hero-section">
        <img src={hero} alt="Restaurant" className="hero-img" />

        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Trio Delights</h1>
          <p className="hero-sub">
            Experience fine dining with a touch of luxury.
          </p>

          <div className="hero-buttons">
            <a className="hero-btn" href="/menu">View Menu</a>
            <a className="hero-btn-outline" href="/book">Book a Table</a>
          </div>
        </div>
      </div>

      <div className="home-intro">
        <h2>Delicious • Elegant • Memorable</h2>
        <p>
          Discover the perfect blend of taste and ambiance. Our carefully
          curated dishes bring you a premium dining experience, made with love
          and served with passion.
        </p>
      </div>
    </>
  );
}
