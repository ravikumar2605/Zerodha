require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Holdings } = require("./model/HoldingsModel");
const { Positions } = require("./model/PositionsModel");
const { Orders } = require("./model/OrdersModel");

const mainRouter = require("./routes/mainRouter");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", mainRouter);

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await Holdings.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await Positions.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new Orders({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});
