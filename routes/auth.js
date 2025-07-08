const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });

  if (existing) return res.status(400).json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, passwordHash: hash });
  await user.save();
  res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1y" });
  res.json({ token });
});

module.exports = router;
