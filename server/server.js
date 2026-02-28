const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Booking = require("./models/Booking");
const FoodOrder = require("./models/FoodOrder");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// ------------------ ROUTES ------------------ //

// Save Booking
app.post("/api/bookings", async (req, res) => {
  try {
    console.log("Received Booking:", req.body);

    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking saved successfully",
      bookingId: savedBooking._id
    });

  } catch (err) {
    console.log("Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Verify Booking
app.get("/api/bookings/verify/:email", async (req, res) => {
  try {
    const booking = await Booking.findOne({ email: req.params.email });

    if (booking) {
      res.status(200).json({
        success: true,
        hasBooking: true,
        booking
      });
    } else {
      res.status(200).json({
        success: true,
        hasBooking: false
      });
    }

  } catch (err) {
    console.log("Verification Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Save Food Order
app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received Order:", req.body);

    const { email, name, tableNo, items, totalAmount } = req.body;

    const booking = await Booking.findOne({ email });

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "No table booking found. Please book a table first."
      });
    }

    const order = new FoodOrder({
      name,
      email,
      tableNo,
      items,
      totalAmount
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully"
    });

  } catch (err) {
    console.log("Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Get All Bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Get All Orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await FoodOrder.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Start Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});