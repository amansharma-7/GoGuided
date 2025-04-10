require("dotenv").config();

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const sendErrorDev = (error) => {
    res.status(error.statusCode).json({
      status: error.status,
      error,
      message: error.message,
      stack: error.stack,
    });
  };

  const sendErrorProd = (error) => {
    // Operational, trusted error
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      // Programming or unknown error: don't leak details
      console.error("ERROR 💥", error);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  };

  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err); // ✅ preserves prototype chain

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error);
  }
};
