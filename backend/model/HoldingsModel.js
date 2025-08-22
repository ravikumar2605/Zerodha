const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
});

const Holdings = mongoose.model("holding", HoldingsSchema);
module.exports = { Holdings };
