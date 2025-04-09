const Tour = require("../models/tourModel");
const {
  uploadThumbnail,
  uploadGalleryImage,
} = require("../../utils/cloudinary");
const slugify = require("slugify");
const path = require("path"); // For handling file paths

exports.getAllTours = async (req, res) => {
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
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getTourBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const tour = await Tour.findOne({ slug })
      .lean() // Performance boost
      .populate("reviews");
    // .populate("guides");

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tourData = req.body;
    const slug = slugify(tourData.title, { lower: true, strict: true });

    // Step 0: Check if tour already exists
    const existingTour = await Tour.findOne({ slug });
    if (existingTour) {
      return res.status(400).json({
        status: "fail",
        message:
          "A tour with this title already exists. Please choose a different title.",
      });
    }

    // Validate input files
    if (
      !req.files.thumbnail ||
      !req.files.images ||
      req.files.images.length === 0
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Both thumbnail and at least one gallery image are required.",
      });
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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
