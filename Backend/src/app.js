// =======================
// Core Modules & Packages
// =======================
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// =======================
// Custom Utilities & Error Handling
// =======================
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// =======================
// Routes
// =======================
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// =======================
// Global Middleware
// =======================

// Trust reverse proxy (e.g., for secure cookies behind Nginx, Heroku)
app.set("trust proxy", 1);

// Set security-related HTTP headers
app.use(helmet());

// Rate limiter (apply to all /api/* routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Oops! Too many requests. Let’s slow down and try again shortly",
});
app.use("/api", limiter);

// Enable CORS for frontend origin
const allowedOrigins = [process.env.FRONTEND_URL, "http://10.58.142.172:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse incoming JSON payloads
app.use(express.json());

// Log HTTP requests (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// =======================
// Health Check Route
// =======================
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is live and working",
  });
});

// =======================
// Application Routes
// =======================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/job", jobRoutes);

// =======================
// Handle Unmatched Routes
// =======================
app.use((req, res, next) => {
  return next(new AppError("The requested resource was not found", 404));
});

// =======================
// Global Error Handler
// =======================
app.use(globalErrorHandler);

module.exports = app;
