require("dotenv").config();
const app = require("./app");
const { connectDB, disconnectDB } = require("./src/config/db");
const {
  connectCloudinary,
  disconnectCloudinary,
} = require("./src/config/cloudinary");

const PORT = process.env.PORT || 5000;

let server;

/**
 * Handle uncaught exceptions
 */
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
});

/**
 * Start the server
 */
(async function startServer() {
  try {
    await connectDB();
    connectCloudinary();

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Server failed to start: ${error.message}`);
    process.exit(1);
  }
})();

/**
 * Handle unhandled promise rejections
 */
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  console.error(`${err.name}: ${err.message}`);

  shutdownServer();
});

/**
 * Handle termination signals (e.g., SIGTERM)
 */
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  shutdownServer();
});

/**
 * Graceful shutdown procedure
 */
async function shutdownServer() {
  try {
    if (server) {
      server.close(async () => {
        await cleanUp();
      });
    } else {
      await cleanUp();
    }
  } catch (err) {
    console.error(`❌ Error during shutdown: ${err.message}`);
    process.exit(1);
  }
}

/**
 * Cleanup tasks before exiting
 */
async function cleanUp() {
  try {
    await disconnectDB();
    disconnectCloudinary();
    process.exit(1);
  } catch (err) {
    process.exit(1);
  }
}
