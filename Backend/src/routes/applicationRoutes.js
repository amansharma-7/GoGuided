const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const applicationController = require("../controllers/applicationController");

router.post(
  "/submit-application",
  upload.fields([{ name: "resume" }]),
  applicationController.submitJobApplication
);
router.patch("/approve", applicationController.approveApplication);
router.patch("/reject", applicationController.rejectApplication);
router.get("/application-details", applicationController.getApplicationDetails);
router.get("/get-all-applications", applicationController.getAllApplications);
module.exports = router;
