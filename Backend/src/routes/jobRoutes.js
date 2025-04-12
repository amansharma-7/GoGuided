const express = require("express");
const jobController = require("../controllers/JobController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/create-job", upload.any(), jobController.createJob);
router.post("/edit-job", upload.any(), jobController.editJob);
router.get("/get-all-jobs", upload.any(), jobController.getAllJobs);
router.get("/get-job", upload.any(), jobController.getJobById);
router.delete("/delete-job", upload.any(), jobController.deleteJob);

module.exports = router;
