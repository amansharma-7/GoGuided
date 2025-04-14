const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const authMiddleware = require("../middlewares/authMiddleware");
const applicationMiddleware = require("../middlewares/applicationMiddleware");
const applicationController = require("../controllers/applicationController");

router.post(
  "/submit-application",
  authMiddleware.isLoggedIn,
  upload.fields([{ name: "resume", maxCount: 1 }]),
  applicationMiddleware.validateJobApplication,
  applicationController.submitJobApplication
);
router.patch("/approve", applicationController.approveApplication);
router.patch("/reject", applicationController.rejectApplication);
router.get("/application-details", applicationController.getApplicationDetail);
router.get("/get-all-applications", applicationController.getAllApplications);
module.exports = router;
