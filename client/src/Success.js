import React from "react";
import Navbar from "./components/Navbar";

export default function Success(){
  return (
    <>
      <Navbar />
      <div className="container" style={{paddingTop:40}}>
        <div className="card" style={{textAlign:"center"}}>
          <h1 className="section-title" style={{color: "var(--gold)"}}>Success!</h1>
          <p>Your booking/order was successful. Thank you for choosing Trio Delights.</p>
          <a href="/" style={{color: "var(--gold)", fontWeight:700}}>Return Home</a>
        </div>
      </div>
    </>
  );
}
