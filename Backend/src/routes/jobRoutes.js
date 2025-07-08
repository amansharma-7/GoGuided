const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const jobValidator = require("../validators/jobValidator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create-job",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin", "owner"),
  jobValidator.createJobValidator,
  jobController.createJob
);

router.get("/get-jobs", authMiddleware.protect, jobController.getAllJobs);

module.exports = router;
