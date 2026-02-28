const mongoose = require("mongoose");

const FoodOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  tableNo: String,
  items: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("FoodOrder", FoodOrderSchema);
