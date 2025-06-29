const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// ===== Middleware =====

// Trust proxy (for real IPs, HTTPS detection, secure cookies etc.)
app.set("trust proxy", 1);

// Set security HTTP headers
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Oops! Too many requests. Let’s slow down and try again shortly",
});
app.use("/api", limiter); // apply only to API routes

// Enable CORS for frontend
app.use(cors());

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     optionsSuccessStatus: 200,
//     maxAge: parseInt(process.env.CORS_MAX_AGE) || 86400, // default: 1 day
//   })
// );

app.use(cookieParser());
app.use(express.json());

// Log HTTP requests (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ===== Health Check =====
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is live and working",
  });
});

// ===== Routes =====

// ===== Invalid Route Handler =====
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ===== Global Error Handler =====
app.use(globalErrorHandler);

module.exports = app;
