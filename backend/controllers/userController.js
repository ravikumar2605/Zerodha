const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/UsersModel");

// signup
async function signup(req, res) {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    //user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new User({
      name,
      username,
      email,
      password: hashPassword,
    });
    await user.save();

    // create jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error(("Error during signup: ", error.message));
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).send("Server error!!");
  }
}

module.exports = { signup, login };
