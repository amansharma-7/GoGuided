const express = require("express");
const accountController = require("../controllers/accountController");
const accountValidator = require("../validators/accountValidator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.patch(
  "/update-name",
  authMiddleware.protect,
  accountValidator.updateNameValidator,
  accountController.updateName
);

router.patch(
  "/update-profile-pic",
  authMiddleware.protect,
  accountValidator.profilePictureValidator(),
  accountController.updateProfilePicture
);

module.exports = router;
