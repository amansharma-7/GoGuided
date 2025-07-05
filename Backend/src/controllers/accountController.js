// Core
const sharp = require("sharp");

// Models
const User = require("../models/userModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Configs
const cloudinary = require("../config/cloudinary");

exports.updateName = catchAsync(async (req, res, next) => {
  const { firstName, lastName } = req.body;
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user || user.isDeleted) {
    return next(
      new AppError("User account not found or has been deleted.", 404)
    );
  }

  const isFirstNameSame = user.firstName === firstName;
  const isLastNameSame = user.lastName === lastName;

  if (isFirstNameSame && isLastNameSame) {
    return next(new AppError("New name is the same as the current one.", 400));
  }

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();

  res.status(200).json({
    isSuccess: true,
    message: "Your name has been updated successfully.",
    data: {
      user: {
        name: `${user.firstName} ${user.lastName}`.trim(),
      },
    },
  });
});

exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findById(userId);
  if (!user || user.isDeleted) {
    return next(new AppError("User not found or has been deactivated.", 404));
  }

  if (!req.file || !req.file.buffer) {
    return next(new AppError("Invalid or missing image file.", 400));
  }

  // Resize and convert to WEBP format
  const processedBuffer = await sharp(req.file.buffer)
    .resize(150, 150)
    .webp({ quality: 90 })
    .toBuffer();

  // Upload to Cloudinary
  const uploadToCloudinary = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `goguided/users/profilePics//${userId}`,
          public_id: "avatar",
          overwrite: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(
              new AppError(
                "Profile picture upload failed. Please try again later.",
                502
              )
            );
          }
          resolve(result);
        }
      );

      require("stream").Readable.from(processedBuffer).pipe(stream);
    });

  const uploadResult = await uploadToCloudinary();

  user.profilePic = {
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };

  await user.save();

  res.status(200).json({
    isSuccess: true,
    message: "Profile picture updated successfully.",
    data: {
      user: {
        profilePicUrl: user.profilePic.url,
      },
    },
  });
});
