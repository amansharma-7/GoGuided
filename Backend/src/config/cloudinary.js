const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("✅ Cloudinary connected.");
};

const disconnectCloudinary = () => {
  // Cloudinary is stateless, usually no need to disconnect.
  console.log("🛑 Cloudinary disconnected (stateless).");
};

module.exports = { connectCloudinary, disconnectCloudinary };
