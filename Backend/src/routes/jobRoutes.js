const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");
const upload = require("../middlewares/multer");

router.post("/create-job", upload.any(), jobController.createJob);
router.post("/edit-job", upload.any(), jobController.editJob);
router.get("/get-all-jobs", upload.any(), jobController.getAllJobs);
router.get("/get-job", upload.any(), jobController.getJobById);
router.delete("/delete-job", upload.any(), jobController.deleteJob);

module.exports = router;
