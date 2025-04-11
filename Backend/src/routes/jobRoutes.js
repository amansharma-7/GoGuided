const express = require("express");
const jobController = require("../controllers/JobController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/create-job", upload.any(), jobController.createJob);

module.exports = router;
