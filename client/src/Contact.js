import React from "react";
import Navbar from "./components/Navbar";

export default function Contact(){
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h1 className="section-title">Contact</h1>
          <p>Email: hello@triodelights.com</p>
          <p>Phone: +91 90000 00000</p>
          <p>Address: 123 Food Street, Your City</p>
        </div>
      </div>
    </>
  );
}
