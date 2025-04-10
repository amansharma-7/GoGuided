const Tour = require("../models/tourModel");
const {
  uploadThumbnail,
  uploadGalleryImage,
} = require("../../utils/cloudinary");
const slugify = require("slugify");
const path = require("path"); // For handling file paths
const AppError = require("../../utils/appError");

exports.createTour = async (req, res, next) => {
  try {
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
      thumbnail: thumbnailResult.secure_url,
      images: galleryResults.map((img) => img.secure_url),
    });

    res.status(201).json({
      status: "success",
      data: newTour,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.find()
      .lean()
      .select(
        "thumbnail title overview location startDate difficulty tourSpots"
      );

    const data = tours.map(({ tourSpots, ...rest }) => ({
      ...rest,
      stops: tourSpots?.length || 0,
    }));

    res.status(200).json({
      status: "success",
      results: data.length,
      data: { tours: data },
    });
  } catch (error) {
    next(error);
  }
};

exports.getTourBySlug = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
