const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const tourRoutes = require("./src/routes/tourRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);

// Handle unhandled routes
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
