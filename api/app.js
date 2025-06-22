const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./src/routes/authRoutes");
const tourRoutes = require("./src/routes/tourRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const userSearchRoutes = require("./src/routes/userSearchRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const emailRoutes = require("./src/routes/emailRoutes");
const dashboardRoutes = require("./src/routes/dashboard");
const paymentRoutes = require("./src/routes/paymentRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is live and working",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/accounts", userSearchRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/bookings", bookingRoutes);

// Handle unhandled routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
