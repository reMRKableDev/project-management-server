const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "project-management",
    allowedFormats: ["jpg", "png"],
    use_filename: true,
  },
});

// pass Cloudinary Storage to multer so that it can be used in the routes
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
