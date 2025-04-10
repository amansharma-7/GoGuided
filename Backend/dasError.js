const dasError = (err, req, res, next) => {
  console.error("🔥 Error caught:", err.stack || err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = dasError;
