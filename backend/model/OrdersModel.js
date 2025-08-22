const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

const Orders = mongoose.model("order", OrdersSchema);
module.exports = { Orders };
