import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    tableNo: "",
    guests: "",
    request: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.tableNo ||
      !formData.guests
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      // Send to backend
      const response = await axios.post(
        "http://localhost:3001/api/bookings",
        formData
      );

      if (response.data.success) {
        // Store booking info in localStorage
        const bookingData = {
          ...formData,
          bookingId: response.data.bookingId,
          timestamp: new Date().toISOString()
        };
        
        localStorage.setItem("bookingData", JSON.stringify(bookingData));
        localStorage.setItem("hasTableBooking", "true");

        alert("Table booked successfully! You can now pre-order food.");

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          tableNo: "",
          guests: "",
          request: "",
        });

        // Redirect to menu
        window.location.href = "/menu";
      } else {
        alert("Booking failed. Try again.");
      }
    } catch (error) {
      console.log("Booking Error:", error);
      alert("Booking failed. Ensure backend is running.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-book">
        <h2 className="title">Reserve a Table</h2>
        <p style={{textAlign: "center", color: "var(--muted)", marginBottom: "20px"}}>
          Book your table first to enable food pre-ordering
        </p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Mobile number"
                required
              />
            </div>

            <div className="form-field">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Guests *</label>
              <input
                type="number"
                name="guests"
                min="1"
                max="20"
                value={formData.guests}
                onChange={handleChange}
                placeholder="No. of guests"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Table No *</label>
            <select
              name="tableNo"
              value={formData.tableNo}
              onChange={handleChange}
              required
            >
              <option value="">Select Table</option>
              <option value="1">Table 1</option>
              <option value="2">Table 2 (Couple)</option>
              <option value="3">Table 3</option>
              <option value="4">Table 4 (Family)</option>
              <option value="5">Table 5 (Friends)</option>
            </select>
          </div>

          <div className="form-field">
            <label>Special Request</label>
            <textarea
              name="request"
              rows="3"
              value={formData.request}
              onChange={handleChange}
              placeholder="Any special instructions?"
            ></textarea>
          </div>

          <button className="btn-submit" type="submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </>
  );
}