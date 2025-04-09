const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const slugify = require("slugify");

// Load env variables
dotenv.config();

// Models
const Tour = require("../src/models/tourModel");
const User = require("../src/models/userModel");
const Review = require("../src/models/reviewModel");

// Read JSON files
const readJSON = (filePath) =>
  JSON.parse(fs.readFileSync(`${__dirname}/${filePath}`, "utf-8"));

// Data
const tours = readJSON("./data/tours.json").map((tour) => ({
  ...tour,
  slug: slugify(tour.title, { lower: true }),
}));
const users = readJSON("./data/users.json");
const reviews = readJSON("./data/reviews.json");

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL.replace(
        "<db_password>",
        process.env.MONGO_PASSWORD
      ),
      {
        dbName: process.env.MONGO_DB_NAME,
      }
    );
    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

// Import data
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("✅ Data successfully imported");
  } catch (err) {
    console.error("❌ Import error:", err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("✅ Data successfully deleted");
  } catch (err) {
    console.error("❌ Delete error:", err);
  }
};

// Run operations
const run = async () => {
  await connectDB();

  const command = process.argv[2];

  switch (command) {
    case "--import":
      await importData();
      break;
    case "--delete":
      await deleteData();
      break;
    case "--refresh":
      await deleteData();
      await importData();
      break;
    default:
      console.log("⚠️  Invalid command. Use:");
      console.log("   node dev-data/import-data.js --import   # Import data");
      console.log("   node dev-data/import-data.js --delete   # Delete data");
      console.log(
        "   node dev-data/import-data.js --refresh  # Delete & import data"
      );
      break;
  }

  mongoose.connection.close();
  process.exit();
};

run();
