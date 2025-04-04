const app = require("./app"); // Express app
const connectDB = require("./src/config/db"); // MongoDB connection
require("dotenv").config(); // Load .env

const PORT = process.env.PORT || 5000;

// Start server only after DB is connected

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
})();
