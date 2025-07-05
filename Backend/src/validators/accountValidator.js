const validate = require("./validate");
const multer = require("multer");
const fileUpload = require("../middlewares/fileUpload");

const {
  firstNameFieldValidator,
  lastNameFieldValidator,
  splitNameToFirstAndLast,
} = require("./commonFieldValidators");
const AppError = require("../utils/appError");

exports.updateNameValidator = validate([
  splitNameToFirstAndLast,
  firstNameFieldValidator,
  lastNameFieldValidator,
]);

exports.profilePictureValidator = () => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  return (req, res, next) => {
    const uploader = fileUpload.single("profilePic");

    uploader(req, res, function (err) {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return next(new AppError("File size exceeds 5MB limit", 400));
          }
        }

        return next(new AppError("An error occurred during file upload", 400));
      }

      if (!req.file) {
        return next(new AppError("Profile picture is required", 400));
      }

      if (!allowedTypes.includes(req.file.mimetype)) {
        return next(
          new AppError(
            `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
            400
          )
        );
      }

      next();
    });
  };
};
