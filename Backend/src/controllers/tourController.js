// Core
const slugify = require("slugify");

// Models
const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewModel");

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
  const {
    page = 1,
    limit = 10,
    search = "",
    sortOrder = "asc",
    status,
    startDate,
    endDate,
  } = req.query;

  const filters = {};

  // 🔍 Search on tour title (case-insensitive)
  if (search) {
    filters.title = { $regex: search, $options: "i" };
  }

  // 📆 Date range filter
  if (startDate || endDate) {
    filters.startDate = {};
    if (startDate) filters.startDate.$gte = new Date(startDate);
    if (endDate) filters.startDate.$lte = new Date(endDate);
  }

  // 🟡 Status filtering logic (based on current date)
  if (status) {
    const today = new Date();

    if (status === "upcoming") {
      filters.startDate = { $gt: today };
    } else if (status === "ongoing") {
      filters.startDate = { $lte: today };
      filters.endDate = { $gte: today };
    } else if (status === "completed") {
      filters.endDate = { $lt: today };
    }
  }

  // 📊 Pagination setup
  const skip = (page - 1) * limit;

  // 🧮 Get total count after filtering
  const total = await Tour.countDocuments(filters);

  // 📦 Fetch filtered & paginated data
  const tours = await Tour.find(filters)
    .select(
      "title slug location duration difficulty startDate endDate pricePerPerson description participants"
    )
    .sort({ startDate: sortOrder === "desc" ? -1 : 1 })
    .skip(skip)
    .limit(Number(limit));

  // ✅ Final response
  res.status(200).json({
    isSuccess: true,
    data: {
      totalPages: Math.ceil(total / limit),
      total,
      tours,
    },
  });
});

exports.getAllToursAsCards = catchAsync(async (req, res, next) => {
  // Step 1: Get all tours
  const tours = await Tour.find()
    .select(
      "title slug description location startDate loacation difficulty tourSpots thumbnail"
    )
    .lean();

  // Step 2: Get avgRating for all tours
  const ratingAgg = await Review.aggregate([
    {
      $group: {
        _id: "$tour",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  // Step 3: Create a map for quick lookup
  const ratingMap = {};
  ratingAgg.forEach((r) => {
    ratingMap[r._id.toString()] = parseFloat(r.avgRating.toFixed(1));
  });

  // Step 4: Build final response
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
        avgRating: ratingMap[tour._id.toString()] || 0,
        tourSpots: tour.tourSpots?.length || 0,
        thumbnail: tour.thumbnail?.secure_url || null,
      })),
    },
  });
});

exports.getTourBySlug = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  let tour = await Tour.findOne({ slug }).populate({
    path: "guides",
    select: "firstName lastName profilePic",
  });

  // Get all reviews for this tour with user info
  const reviews = await Review.find({ tour: tour._id })
    .select("rating review")
    .populate({
      path: "user",
      select: "firstName lastName profilePic",
    })
    .sort({ createdAt: -1 })
    .limit(10);

  // Calculate booked participants
  const bookingAgg = await Booking.aggregate([
    {
      $match: {
        tour: tour._id,
        status: "confirmed",
      },
    },
    {
      $group: {
        _id: "$tour",
        totalBooked: { $sum: "$numberOfParticipants" },
      },
    },
  ]);

  const booked = bookingAgg[0]?.totalBooked || 0;
  const availableSlots = Math.max(0, tour.participants - booked);

  // Get average rating and total reviews for this tour
  const ratingAgg = await Review.aggregate([
    {
      $match: { tour: tour._id },
    },
    {
      $group: {
        _id: "$tour",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const avgRating = ratingAgg[0]?.avgRating || 0;
  const totalReviews = ratingAgg[0]?.totalReviews || 0;

  // Convert tour to plain object
  tour = tour.toObject();

  // Add reviews
  tour.reviews = reviews.map((r) => ({
    _id: r._id,
    rating: r.rating,
    review: r.review,
    reviewerName: `${r.user.firstName} ${r.user.lastName}`,
    profilePicUrl: r.user.profilePic?.url || null,
  }));

  // Add available slots and rating info
  tour.availableSlots = availableSlots;
  tour.avgRating = parseFloat(avgRating.toFixed(1));
  tour.totalReviews = totalReviews;

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

  res.status(200).json({
    isSuccess: true,
    data: {
      tour: tour || [],
    },
  });
});
