const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const tourRoutes = require("./src/routes/tourRoutes");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/tours", tourRoutes);

// Error handling middleware
// app.use(errorHandler);

module.exports = app;
