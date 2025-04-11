const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");

// Generic function to process and upload images
const processAndUpload = async (
  fileBuffer,
  folderPath,
  width,
  height,
  quality = 80
) => {
  try {
    let imageProcessor = sharp(fileBuffer);

    if (width || height) {
      imageProcessor = imageProcessor.resize(width, height);
    }

    const processedBuffer = await imageProcessor.webp({ quality }).toBuffer();

    return new Promise((resolve, reject) => {
      const options = { folder: folderPath };
      options.overwrite = true; // make sure it replaces the old one

      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(processedBuffer);
    });
  } catch (error) {
    console.error(`Image upload failed for folder ${folderPath}:`, error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Upload thumbnail
const uploadThumbnail = async (fileBuffer, slug) => {
  const folderPath = `tour-images/${slug}/thumbnail`;
  return processAndUpload(fileBuffer, folderPath, 500, 300, 80);
};

// Upload gallery image
const uploadGalleryImage = async (fileBuffer, slug) => {
  const folderPath = `tour-images/${slug}/gallery`;
  return processAndUpload(fileBuffer, folderPath, 1200, null, 90);
};

//upload resume
const uploadResume = async (fileBuffer, fileName) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw", // Use "raw" for non-image files like PDF, DOCX
          folder: "resumes",
          public_id: fileName.split(".")[0], // Optional: name without extension
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Resume upload failed:", error);
    throw new Error("Failed to upload resume to Cloudinary");
  }
};
// Upload profile picture
const uploadProfilePicture = async (fileBuffer, userId) => {
  const folderPath = `user-profiles/${userId}`;
  // Typical profile pic size (you can adjust if needed)
  return processAndUpload(fileBuffer, folderPath, 400, 400, 85);
};

module.exports = {
  uploadThumbnail,
  uploadGalleryImage,
  uploadResume,
  uploadProfilePicture,
};
