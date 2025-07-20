// Core
const slugify = require("slugify");

// Models
const Tour = require("../models/tourModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { uploadImageToCloudinary } = require("../utils/cloudinaryUploader");

exports.createTour = catchAsync(async (req, res, next) => {
  const {
    title,
    location,
    duration,
    participants,
    difficulty,
    languages,
    startDate,
    overview,
    highlights,
    included,
    guides,
    pricePerPerson,
    currency = "INR",
    stops,
  } = req.body;

  const slug = slugify(title, { lower: true });

  const existingTour = await Tour.findOne({ slug });
  if (existingTour) {
    return next(
      new AppError(
        "A tour with this title already exists. Please choose a different title.",
        400
      )
    );
  }

  // Transform tour spots
  const tourSpots = stops.map((spot, index) => ({
    day: index + 1,
    name: spot.name.trim(),
    description: spot.description.trim(),
    location: {
      type: "Point",
      coordinates: [parseFloat(spot.lng), parseFloat(spot.lat)], // [lng, lat]
    },
  }));

  // Validate thumbnail presence
  if (!req.files?.thumbnail || req.files.thumbnail.length === 0) {
    return next(new AppError("Thumbnail image is required", 400));
  }

  // ✅ Upload thumbnail (resize + compress)
  const thumbnailFile = req.files.thumbnail[0];
  const thumbnail = await uploadImageToCloudinary({
    buffer: thumbnailFile.buffer,
    folder: `goguided/tours/${slug}`,
    publicId: "thumbnail",
    resize: { width: 600, height: 900 },
    quality: 85,
  });

  // Validate image presence
  if (!req.files?.images || req.files.images.length === 0) {
    return next(new AppError("At least one image is required", 400));
  }

  // ✅ Upload images in parallel
  const imageUploadPromises = req.files.images.map((img, index) =>
    uploadImageToCloudinary({
      buffer: img.buffer,
      folder: `goguided/tours/${slug}`,
      publicId: `image_${index + 1}`,
      resize: { width: 1920 },
      quality: 85,
    })
  );

  const images = await Promise.all(imageUploadPromises);

  // ✅ Create tour in DB
  const newTour = await Tour.create({
    title: title.trim(),
    slug,
    location: location.trim(),
    duration,
    participants: Number(participants),
    difficulty,
    languages,
    startDate: new Date(startDate),
    overview: overview.trim(),
    highlights,
    included,
    guides,
    thumbnail,
    images,
    tourSpots,
    pricePerPerson: Number(pricePerPerson),
    currency,
  });

  res.status(201).json({
    isSuccess: true,
    message: "Tour created successfully.",
    tour: newTour,
  });
});
