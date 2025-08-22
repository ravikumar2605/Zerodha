const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

const Positions = mongoose.model("position", PositionsSchema);
module.exports = { Positions };
