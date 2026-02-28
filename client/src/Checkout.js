import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [cart, setCart] = useState([]);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get cart from navigation state
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    }

    // Get booking info from localStorage
    const savedBooking = localStorage.getItem("bookingData");
    const hasBooking = localStorage.getItem("hasTableBooking");

    if (!savedBooking || hasBooking !== "true") {
      alert("No table booking found. Please book a table first.");
      navigate("/book");
      return;
    }

    setBookingInfo(JSON.parse(savedBooking));
  }, [location, navigate]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handlePlaceOrder = async () => {
    if (!bookingInfo) {
      alert("Booking information not found!");
      navigate("/book");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        name: bookingInfo.name,
        email: bookingInfo.email,
        tableNo: bookingInfo.tableNo,
        items: cart.map(item => ({
          name: item.name,
          qty: item.qty,
          price: item.price
        })),
        totalAmount: calculateTotal()
      };

      const response = await axios.post(
        "http://localhost:3001/api/orders",
        orderData
      );

      if (response.data.success) {
        alert("Order placed successfully!");
        
        // Clear cart but keep booking info
        localStorage.removeItem("cartData");
        
        navigate("/success");
      } else {
        alert(response.data.message || "Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Order failed. Please try again.");
      } else {
        alert("Order failed. Ensure backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!bookingInfo) {
    return (
      <>
        <Navbar />
        <div className="checkout-container">
          <h2 className="checkout-title">Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        {/* Booking Details */}
        <div className="checkout-card" style={{marginBottom: "20px"}}>
          <h3 style={{color: "var(--gold)", marginBottom: "15px"}}>Booking Details</h3>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
            <div>
              <strong>Name:</strong> {bookingInfo.name}
            </div>
            <div>
              <strong>Email:</strong> {bookingInfo.email}
            </div>
            <div>
              <strong>Table:</strong> {bookingInfo.tableNo}
            </div>
            <div>
              <strong>Date:</strong> {bookingInfo.date}
            </div>
            <div>
              <strong>Time:</strong> {bookingInfo.time}
            </div>
            <div>
              <strong>Guests:</strong> {bookingInfo.guests}
            </div>
          </div>
          {bookingInfo.request && (
            <div style={{marginTop: "10px"}}>
              <strong>Special Request:</strong> {bookingInfo.request}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout-card">
          {cart.length === 0 ? (
            <div className="empty-msg">
              <p>Your cart is empty</p>
              <a href="/menu" style={{color: "var(--gold)", fontWeight: "bold"}}>
                Go to Menu
              </a>
            </div>
          ) : (
            <>
              <h3 style={{color: "var(--white)", marginBottom: "15px"}}>Order Summary</h3>
              
              <table className="checkout-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="checkout-total">
                Total Amount: ₹{calculateTotal()}
              </div>

              <button 
                className="place-btn" 
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}