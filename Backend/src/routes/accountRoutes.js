const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get("/role/:role", accountController.getAccountsByRole);

module.exports = router;
