const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");
const upload = require("../middlewares/multer");

router.post("/create-job", upload.any(), jobController.createJob);

module.exports = router;
