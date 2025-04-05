const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") }); // Optional if .env is at root

const url = process.env.MONGO_URL.replace(
  "<db_password>",
  process.env.MONGO_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      dbName: process.env.MONGO_DB_NAME, // Make DB name explicit
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
