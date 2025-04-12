const express = require("express");
const userSearchController = require("../controllers/userSearchController");

const router = express.Router();

router.get("/role/:role", userSearchController.getAccountsByRole);

module.exports = router;
