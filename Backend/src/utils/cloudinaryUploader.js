const sharp = require("sharp");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const AppError = require("./appError");
const logger = require("./logger");

/**
 * Uploads and optionally resizes/compresses an image to Cloudinary.
 *
 * @param {Object} params
 * @param {Buffer} params.buffer - Raw image buffer
 * @param {String} params.folder - Cloudinary folder path
 * @param {String} [params.publicId] - Optional specific public ID
 * @param {Object} [params.resize] - Optional resize config { width, height }
 * @param {Number} [params.quality] - WebP quality (default: 90)
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadImageToCloudinary = ({
  buffer,
  folder,
  publicId = undefined,
  resize = {},
  quality = 90,
}) => {
  return new Promise((resolve, reject) => {
    try {
      let transformer = sharp().webp({ quality });

      if (resize.width && resize.height) {
        transformer = transformer.resize(resize.width, resize.height);
      } else if (resize.width) {
        transformer = transformer.resize(resize.width);
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: "image",
          overwrite: true,
          disable_promises: true,
        },
        (err, result) => {
          if (err) {
            logger.error("⛔ Cloudinary upload error:", err);

            return reject(
              new AppError(
                "There was a problem uploading the image. Please try again.",
                502
              )
            );
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(transformer).pipe(uploadStream);
    } catch (err) {
      logger.error("⛔ Image processing error:", err);

      reject(
        new AppError(
          "Could not process the image. Please try again later.",
          500
        )
      );
    }
  });
};

module.exports = uploadImageToCloudinary;
