const { createLogger, format, transports } = require("winston");
const path = require("path");

const env = process.env.NODE_ENV || "development";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // Console logging
    new transports.Console({
      format:
        env === "development"
          ? format.combine(format.colorize(), logFormat)
          : format.simple(),
    }),

    // File logging only in production
    ...(env === "production"
      ? [
          new transports.File({
            filename: path.join(__dirname, "../../logs/error.log"),
            level: "error",
          }),
          new transports.File({
            filename: path.join(__dirname, "../../logs/combined.log"),
          }),
        ]
      : []),
  ],
});

module.exports = logger;
