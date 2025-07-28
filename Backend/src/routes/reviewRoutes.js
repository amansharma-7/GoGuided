const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const reviewValidator = require("../validators/reviewValidator");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post(
  "/:tourId",
  authMiddleware.protect,
  authMiddleware.restrictTo("user"),
  reviewValidator.validateReview,
  reviewController.createOrUpdateReview
);

router.delete(
  "/:reviewId",
  authMiddleware.protect,
  authMiddleware.restrictTo("user", "owner"),
  reviewController.deleteReview
);

router.get(
  "/user-reviews",
  authMiddleware.protect,
  authMiddleware.restrictTo("user"),
  reviewController.getUserReviews
);

router.get("/recent", reviewController.getRecentReviews);

module.exports = router;
