const express = require("express");
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");
const jobMiddleware = require("../middlewares/jobMiddleware");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/create-job",
  upload.any(),
  authMiddleware.isLoggedIn,
  authMiddleware.restrictToAdmin,
  jobMiddleware.createJobValidator,
  jobController.createJob
);
router.post(
  "/edit-job",
  upload.any(),
  authMiddleware.isLoggedIn,
  authMiddleware.restrictToAdmin,
  jobMiddleware.editJobValidator,
  jobController.editJob
);
router.get("/get-all-jobs", upload.any(), jobController.getAllJobs);
router.get("/get-job", upload.any(), jobController.getJobById);
router.delete("/delete-job", upload.any(), jobController.deleteJob);

module.exports = router;
