const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./src/Routes/userRoutes");
// const routes = require("./src/routes");
// const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api", userRoutes);

// Error handling middleware
// app.use(errorHandler);

module.exports = app;
