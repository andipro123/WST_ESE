const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  expiry: Date,
});

module.exports = mongoose.model("Product", ProductSchema);
