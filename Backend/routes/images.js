const express = require("express");
const router = express.Router();
const { cloudinary, upload } = require("../config/cloudinary");
const Image = require("../models/Image");

// ------------------------- UPLOAD IMAGE -------------------------
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "digiora/images",
      resource_type: "image"
    });

    const newImage = new Image({
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id
    });

    await newImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: newImage
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message
    });
  }
});

// ------------------------- GET ALL IMAGES -------------------------
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Images retrieved successfully",
      data: images
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch images"
    });
  }
});

// ------------------------- UPDATE IMAGE -------------------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "digiora/images",
      resource_type: "image"
    });

    image.imageUrl = result.secure_url;
    image.cloudinaryId = result.public_id;
    await image.save();

    res.json({
      success: true,
      message: "Image updated successfully",
      data: image
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update image"
    });
  }
});

// ------------------------- DELETE IMAGE -------------------------
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from MongoDB
    await Image.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image"
    });
  }
});

module.exports = router;
