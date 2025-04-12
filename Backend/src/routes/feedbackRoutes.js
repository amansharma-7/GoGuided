const express = require("express");
const feedbackMidlleware = require("../middlewares/feedbackMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router.post(
  "/submit",
  feedbackMidlleware.validateFeedback,
  feedbackController.submitFeedback
);
router.patch(
  "/resolve",
  authMiddleware.isLoggedIn,
  authMiddleware.restrictToAdmin,
  feedbackController.resolveFeedback
);

module.exports = router;
