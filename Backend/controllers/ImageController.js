const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'digiora/images',
      resource_type: 'image'
    });

    // Save to DB
    const image = new Image({
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id
    });

    await image.save();

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: 'Image uploaded successfully',
      image
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json({ images });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Server error fetching images' });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from MongoDB
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error during delete' });
  }
};

// Update image
exports.updateImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'digiora/images',
      resource_type: 'image'
    });

    // Update image record
    image.imageUrl = result.secure_url;
    image.cloudinaryId = result.public_id;
    await image.save();

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.json({ message: 'Image updated successfully', image });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error during update' });
  }
};
