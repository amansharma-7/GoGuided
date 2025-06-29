const crypto = require("crypto");

/**
 * Generates a secure random token and its SHA-256 hash.
 * @param {number} size - Size in bytes for the token (default 32)
 * @returns {{ token: string, hashedToken: string }}
 */
const generateHashedToken = (size = 32) => {
  const token = crypto.randomBytes(size).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hashedToken };
};

module.exports = { generateHashedToken };
