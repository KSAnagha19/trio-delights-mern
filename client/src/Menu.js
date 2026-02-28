import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

// Import REAL images
import pasta from "./assets/pasta.jpg";
import pizza from "./assets/margherita.jpg";
import biryani from "./assets/veg-biryani.jpg";
import paneer from "./assets/paneer-butter-masala.jpg";
import rice from "./assets/chicken-fried-rice.jpg";
import sandwich from "./assets/grilled-sandwich.jpg";
import fries from "./assets/french-fries.jpg";
import burger from "./assets/veg-burger.jpg";
import dosa from "./assets/masala-dosa.jpg";
import shake from "./assets/chocolate-milkshake.jpg";

export default function Menu() {
  const navigate = useNavigate();
  
  const [hasBooking, setHasBooking] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  // Updated items with new imported images
  const items = [
    { id:1, name:"Pasta Alfredo", price:180, img:pasta },
    { id:2, name:"Margherita Pizza", price:220, img:pizza },
    { id:3, name:"Veg Biryani", price:150, img:biryani },
    { id:4, name:"Paneer Butter Masala", price:210, img:paneer },
    { id:5, name:"Chicken Fried Rice", price:170, img:rice },
    { id:6, name:"Grilled Sandwich", price:120, img:sandwich },
    { id:7, name:"French Fries", price:100, img:fries },
    { id:8, name:"Veg Burger", price:130, img:burger },
    { id:9, name:"Masala Dosa", price:90, img:dosa },
    { id:10, name:"Chocolate Milkshake", price:160, img:shake }
  ];

  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  // Check if user has a table booking
  useEffect(() => {
    const bookingData = localStorage.getItem("bookingData");
    const hasTableBooking = localStorage.getItem("hasTableBooking");
    
    if (bookingData && hasTableBooking === "true") {
      setHasBooking(true);
      setBookingInfo(JSON.parse(bookingData));
    }
  }, []);

  const handleQty = (id, val) => {
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  const addToCart = (item) => {
    if (!hasBooking) {
      alert("Please book a table first before ordering food!");
      navigate("/book");
      return;
    }

    const q = Number(quantities[item.id] || 1);
    if (q <= 0) return;

    const existing = cart.find(c => c.id === item.id);

    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + q } : c));
    } else {
      setCart([...cart, { ...item, qty: q }]);
    }
    
    alert(`${item.name} added to cart!`);
  };

  const goToCheckout = () => {
    if (!hasBooking) {
      alert("Please book a table first!");
      navigate("/book");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout", { state: { cart, bookingInfo } });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {!hasBooking && (
          <div style={{
            background: "rgba(212, 175, 55, 0.1)",
            border: "1px solid var(--gold)",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <p style={{color: "var(--gold)", margin: 0}}>
              ⚠️ Please <a href="/book" style={{color: "var(--gold)", fontWeight: "bold", textDecoration: "underline"}}>book a table</a> first to pre-order food
            </p>
          </div>
        )}

        {hasBooking && bookingInfo && (
          <div style={{
            background: "rgba(0, 255, 0, 0.05)",
            border: "1px solid #00ff00",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <p style={{color: "#00ff00", margin: 0}}>
              ✓ Table Booked: {bookingInfo.name} | Table {bookingInfo.tableNo} | {bookingInfo.date} at {bookingInfo.time}
            </p>
          </div>
        )}

        <h1 className="section-title">Menu</h1>

        <div className="menu-grid">
          {items.map(it => (
            <div className="menu-card card" key={it.id}>
              <img src={it.img} alt={it.name} className="dish-img" />

              <h3>{it.name}</h3>
              <p className="menu-price">₹{it.price}</p>

              <div className="menu-controls">
                <select
                  value={quantities[it.id] || 1}
                  onChange={(e) => handleQty(it.id, e.target.value)}
                  disabled={!hasBooking}
                >
                  {[...Array(11).keys()].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>

                <button 
                  className="add-btn" 
                  onClick={() => addToCart(it)}
                  disabled={!hasBooking}
                  style={{
                    opacity: hasBooking ? 1 : 0.5,
                    cursor: hasBooking ? "pointer" : "not-allowed"
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary card">
          <h3>Cart Summary</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map(c => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.qty}</td>
                      <td>₹{c.price * c.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-total">
                Total: ₹{cart.reduce((s, i) => s + i.price * i.qty, 0)}
              </div>

              <button className="checkout-cta" onClick={goToCheckout}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}