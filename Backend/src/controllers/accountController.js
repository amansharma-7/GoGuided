// Models
const User = require("../models/userModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Configs
const cloudinary = require("../config/cloudinary");
const sharp = require("sharp");

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
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
});

exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  // 1. Resize and convert to WEBP
  const processedBuffer = await sharp(req.file.buffer)
    .resize(150, 150)
    .webp({ quality: 90 })
    .toBuffer();

  // 2. Upload to Cloudinary
  const uploadToCloudinary = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "goguided/profilePics" },
        (error, result) => {
          if (error) {
            return reject(
              new AppError(
                "Profile upload failed. Please try again later.",
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

  // 3. Update user profile picture
  const user = await User.findById(userId);
  if (!user || user.isDeleted) {
    return next(new AppError("User not found or deactivated.", 404));
  }

  // Delete old picture if it exists
  if (user.profilePic?.publicId) {
    await cloudinary.uploader.destroy(user.profilePic.publicId);
  }

  user.profilePic = {
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile picture updated successfully",
    data: {
      profilePicUrl: user.profilePic.url,
    },
  });
});
