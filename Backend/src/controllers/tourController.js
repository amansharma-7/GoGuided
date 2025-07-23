// Core
const slugify = require("slugify");

// Models
const Tour = require("../models/tourModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { uploadImageToCloudinary } = require("../utils/cloudinaryUploader");

function transformTourSpots(tourSpots) {
  return tourSpots.map((spot) => {
    const dayLabel = `Day ${spot.day}`;
    const lat = spot.location.coordinates[1];
    const lng = spot.location.coordinates[0];

    return {
      day: dayLabel,
      place: spot.name,
      task: spot.description,
      position: { lat, lng },
    };
  });
}

exports.createTour = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
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
    description,
    location: location.trim(),
    duration,
    participants: Number(participants),
    difficulty,
    languages,
    startDate: new Date(startDate),
    endDate: new Date(
      new Date(startDate).getTime() + (duration - 1) * 24 * 60 * 60 * 1000
    ),
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

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find().select(
    "title slug location duration difficulty startDate endDate pricePerPerson description participants"
  );

  res.status(200).json({
    isSuccess: true,
    data: { tours },
  });
});

exports.getAllToursAsCards = catchAsync(async (req, res, next) => {
  const tours = await Tour.find()
    .select(
      "title slug description location startDate loacation difficulty tourSpots rating thumbnail"
    )
    .lean();

  res.status(200).json({
    isSuccess: true,
    results: tours.length,
    data: {
      tours: tours.map((tour) => ({
        _id: tour._id,
        title: tour.title,
        slug: tour.slug,
        description: tour.description,
        location: tour.location,
        startDate: tour.startDate,
        loacation: tour.loacation,
        difficulty: tour.difficulty,
        rating: tour.rating,
        tourSpots: tour.tourSpots?.length || 0,
        thumbnail: tour.thumbnail?.secure_url || null,
      })),
    },
  });
});

exports.getTourBySlug = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  let tour = await Tour.findOne({ slug })
    .populate({
      path: "guides",
      select: "firstName lastName profilePic",
    })
    .lean();

  // Transform images
  if (tour.images && Array.isArray(tour.images)) {
    tour.images = tour.images.map((image) => ({ url: image.secure_url }));
  }

  // Transform guides
  if (tour.guides && Array.isArray(tour.guides)) {
    tour.guides = tour.guides.map((guide) => ({
      _id: guide._id,
      name: `${guide.firstName} ${guide.lastName}`,
      profilePicUrl: guide.profilePic?.url || null,
    }));
  }

  if (tour.tourSpots && Array.isArray(tour.tourSpots)) {
    tour.tourSpots = transformTourSpots(tour.tourSpots);
  }

  console.log(tour.tourSpots);

  res.status(200).json({
    isSuccess: true,
    data: {
      tour: tour || [],
    },
  });
});
