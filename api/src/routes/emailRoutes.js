const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const emailMiddleware = require("../middlewares/emailMiddleware");
const emailController = require("../controllers/emailController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/send",
  //   authMiddleware.isLoggedIn,
  //   authMiddleware.restrictToAdmin,
  upload.any(),
  emailMiddleware.validateSendEmail,
  emailController.sendEmail
);

module.exports = router;
