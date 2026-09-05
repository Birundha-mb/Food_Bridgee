require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const statsRoutes = require("./routes/statsRoutes");
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.APPLICATION_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/stats", statsRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "FoodBridge Backend is running",
  });
});

// Export app for Vercel
module.exports = app;
