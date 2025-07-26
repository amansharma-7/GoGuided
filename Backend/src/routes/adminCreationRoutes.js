const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminCreationController = require("../controllers/adminCreationController");
const adminCreationValidator = require("../validators/adminCreationValidator");

const router = express.Router();

router.post(
  "/create-admin",
  authMiddleware.protect,
  authMiddleware.restrictTo("owner"),
  adminCreationValidator.createAdminValidator,
  adminCreationController.createAdmin
);

router.delete(
  "/delete-admin/:id",
  authMiddleware.protect,
  authMiddleware.restrictTo("owner"),
  adminCreationController.deleteAdmin
);

router.get(
  "/users",
  authMiddleware.protect,
  authMiddleware.restrictTo("owner"),
  adminCreationController.getUsers
);

module.exports = router;
