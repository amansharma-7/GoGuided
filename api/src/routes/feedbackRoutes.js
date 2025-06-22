const express = require("express");
const feedbackMidlleware = require("../middlewares/feedbackMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const feedbackController = require("../controllers/feedbackController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/submit",
  upload.any(),
  feedbackMidlleware.validateFeedback,
  feedbackController.submitFeedback
);
router.patch(
  "/resolve",
  // authMiddleware.isLoggedIn,
  // authMiddleware.restrictToAdmin,
  feedbackController.resolveFeedback
);

module.exports = router;
