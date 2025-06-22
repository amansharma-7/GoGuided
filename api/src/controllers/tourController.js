const Tour = require("../models/tourModel");
const {
  uploadThumbnail,
  uploadGalleryImage,
} = require("../../utils/cloudinary");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.getAllTours = catchAsync(async (req, res) => {
  const tours = await Tour.find()
    .lean()
    .select("thumbnail title overview location startDate difficulty tourSpots");

  const data = tours.map(({ tourSpots, ...rest }) => ({
    ...rest,
    stops: tourSpots?.length || 0,
  }));

  res.status(200).json({
    status: "success",
    results: data.length,
    data: { tours: data },
  });
});

exports.getTourBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;

  const tour = await Tour.findOne({ slug })
    .lean() // Performance boost
    .populate("reviews");
  // .populate("guides");

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const tourData = req.body;
  const slug = slugify(tourData.title, { lower: true, strict: true });

  // Step 0: Check if tour already exists
  const existingTour = await Tour.findOne({ slug });
  if (existingTour) {
    return next(
      new AppError(
        "A tour with this title already exists. Please choose a different title.",
        400
      )
    );
  }

  // Validate input files
  if (
    !req.files.thumbnail ||
    !req.files.images ||
    req.files.images.length === 0
  ) {
    return next(
      new AppError(
        "Both thumbnail and at least one gallery image are required.",
        400
      )
    );
  }

  // Step 1: Upload thumbnail
  const thumbnailResult = await uploadThumbnail(
    req.files.thumbnail[0].buffer,
    slug
  );

  // Step 2: Upload gallery images
  const galleryResults = await Promise.all(
    req.files.images.map((file) => uploadGalleryImage(file.buffer, slug))
  );

  // Step 3: Save tour in DB with URLs
  const newTour = await Tour.create({
    ...tourData,
    slug,
    thumbnail: {
      public_id: thumbnailResult.public_id,
      secure_url: thumbnailResult.secure_url,
    },
    images: galleryResults.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
    })),
  });

  res.status(201).json({
    status: "success",
    data: newTour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const { slug: currentSlug } = req.params;
  const tourData = req.body;

  const tour = await Tour.findOne({ slug: currentSlug });

  if (!tour) {
    return next(new AppError("No tour found with this slug.", 404));
  }

  let newSlug = tour.slug;

  // Step 1: If title is provided, generate new slug and check for duplicates
  if (tourData.title) {
    newSlug = slugify(tourData.title, { lower: true, strict: true });

    const existingTour = await Tour.findOne({
      slug: newSlug,
      _id: { $ne: tour._id },
    });

    if (existingTour) {
      return next(
        new AppError(
          "A tour with this title already exists. Please use a different title.",
          400
        )
      );
    }

    tour.title = tourData.title;
    tour.slug = newSlug;
  }

  // Step 2: Handle thumbnail upload (if provided)
  if (req.files.thumbnail && req.files.thumbnail.length !== 1) {
    return next(
      new AppError("You must upload exactly one thumbnail image.", 400)
    );
  }

  if (req.files.thumbnail && req.files.thumbnail.length === 1) {
    // Delete old thumbnail
    await cloudinary.uploader.destroy(tour.thumbnail.public_id);

    // Upload new thumbnail
    const newThumbnail = await uploadThumbnail(
      req.files.thumbnail[0].buffer,
      newSlug
    );

    tour.thumbnail = {
      public_id: newThumbnail.public_id,
      secure_url: newThumbnail.secure_url,
    };
  }

  // Step 3: Handle gallery images upload (if provided)
  if (req.files.images && req.files.images.length > 0) {
    if (req.files.images.length < 4 || req.files.images.length > 20) {
      return next(
        new AppError("You must upload between 4 and 20 gallery images.", 400)
      );
    }

    // Delete old images
    await Promise.all(
      tour.images.map((img) => cloudinary.uploader.destroy(img.public_id))
    );

    // Upload new images
    const newImages = await Promise.all(
      req.files.images.map((file) => uploadGalleryImage(file.buffer, newSlug))
    );

    tour.images = newImages.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
    }));
  }

  // Step 4: Update remaining tour data
  Object.keys(tourData).forEach((field) => {
    if (field !== "title") {
      tour[field] = tourData[field];
    }
  });

  await tour.save();

  res.status(200).json({
    status: "success",
    data: tour,
  });
});
