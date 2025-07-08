const sharp = require("sharp");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const AppError = require("./appError");
const logger = require("./logger");

/**
 * @param {Object} params
 * @param {Buffer} params.buffer
 * @param {String} params.folder
 * @param {String} [params.publicId]
 * @param {Object} [params.resize] - Optional { width, height }
 * @param {Number} [params.quality] - Optional compression quality (1-100)
 */
const uploadImageToCloudinary = async ({
  buffer,
  folder,
  publicId = undefined,
  resize = {},
  quality = 90, // default to 90
}) => {
  try {
    let imagePipeline = sharp(buffer).webp({ quality });

    if (resize.width && resize.height) {
      imagePipeline = imagePipeline.resize(resize.width, resize.height);
    } else if (resize.width) {
      imagePipeline = imagePipeline.resize(resize.width);
    }

    const finalBuffer = await imagePipeline.toBuffer();

    return new Promise((resolve, reject) => {
      let readStream; // Declare early so it's accessible in the callback

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: "image",
          overwrite: true,
          use_filename: false,
        },
        (err, result) => {
          // ✅ Cleanup after upload completes
          if (readStream && !readStream.destroyed) {
            readStream.destroy();
          }

          if (err) {
            logger.error("⛔ Cloudinary error:", err);
            return reject(
              new AppError("Cloudinary upload failed. Try again later.", 502)
            );
          }

          resolve(result);
        }
      );

      readStream = streamifier.createReadStream(finalBuffer);
      readStream.pipe(uploadStream);
    });
  } catch (err) {
    throw new AppError("Image processing failed", 500);
  }
};

module.exports = uploadImageToCloudinary;
