const express = require("express");
const router = express.Router();
const geocodeController = require("../controllers/geocodeController");

router.get("/reverse-geocode", geocodeController.reverseGeocode);

module.exports = router;
