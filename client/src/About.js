import React from "react";
import Navbar from "./components/Navbar";

export default function About(){
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h1 className="section-title">About Trio Delights</h1>
          <p>Trio Delights is a modern restaurant focusing on seasonal ingredients, great service and memorable dining experiences. Our menu blends classic flavors with contemporary techniques.</p>
        </div>
      </div>
    </>
  );
}
