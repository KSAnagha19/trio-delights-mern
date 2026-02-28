const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  tableNo: String,
  guests: Number,
  request: String
});

module.exports = mongoose.model("Booking", BookingSchema);
