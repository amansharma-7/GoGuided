const express = require("express");
const tourController = require("../controllers/tourController");
const authMiddleware = require("../middlewares/authMiddleware");
const tourMidleware = require("../middlewares/tourMiddleware");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", tourController.getAllTours);
router.post(
  "/create-tour",
  //   authMiddleware.isLoggedIn,
  //   authMiddleware.restrictToAdmin,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]), // accepts form-data (text & files)
  tourMidleware.validateTour,
  tourController.createTour // Create the tour
);

module.exports = router;
