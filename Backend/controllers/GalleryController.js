const Gallery = require("../models/gallery");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
// Temporarily comment out sharp if it continues to fail
// const sharp = require("sharp");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Upload image to Cloudinary
const uploadToCloudinary = async (buffer, folder = "digiora/gallery") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
          transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};

// Get all gallery images
const getAllGalleryImages = async (req, res) => {
  try {
    console.log("🔍 Gallery API called with query:", req.query);

    const { status, category, page = 1, limit = 20, search } = req.query;

    // Build query
    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    console.log("📋 MongoDB query:", query);

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { order: 1, createdAt: -1 },
    };

    const images = await Gallery.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await Gallery.countDocuments(query);

    console.log(`📊 Found ${images.length} images, total: ${total}`);

    // Debug first image
    if (images.length > 0) {
      console.log("🖼️ First image data:", {
        id: images[0]._id,
        title: images[0].title,
        imageUrl: images[0].imageUrl,
        cloudinaryId: images[0].cloudinaryId,
        status: images[0].status,
      });
    }

    res.status(200).json({
      success: true,
      data: images,
      pagination: {
        current: options.page,
        pages: Math.ceil(total / options.limit),
        total,
      },
    });
  } catch (error) {
    console.error("❌ Error in getAllGalleryImages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery images",
      error: error.message,
    });
  }
};

// Get single gallery image
const getGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching gallery image",
      error: error.message,
    });
  }
};

// Create new gallery image
const createGalleryImage = async (req, res) => {
  try {
    console.log('🆕 Creating gallery image with data:', req.body);
    console.log('📁 File info:', req.file ? { 
      name: req.file.originalname, 
      size: req.file.size,
      mimetype: req.file.mimetype 
    } : 'No file');

    const { title, description, category, tags, status, order } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Upload directly to Cloudinary
    console.log('☁️ Uploading to Cloudinary...');
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    console.log('✅ Cloudinary upload successful:', uploadResult.secure_url);

    // Parse tags if they're sent as a string
    let parsedTags = [];
    if (tags) {
      parsedTags =
        typeof tags === "string"
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : tags;
    }

    // Create gallery entry
    const galleryImage = new Gallery({
      title: title || 'Untitled',
      description: description || '',
      category: category || 'Digital Marketing Campaign',
      tags: parsedTags,
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      status: status || "active",
      order: order || 0,
      fileSize: req.file.size,
    });

    const savedImage = await galleryImage.save();
    console.log('💾 Gallery image saved to database:', savedImage._id);

    res.status(201).json({
      success: true,
      message: "Gallery image created successfully",
      data: savedImage,
    });
  } catch (error) {
    console.error('❌ Error in createGalleryImage:', error);
    res.status(500).json({
      success: false,
      message: "Error creating gallery image",
      error: error.message,
    });
  }
};

// Update gallery image
const updateGalleryImage = async (req, res) => {
  try {
    const { title, description, category, tags, status, order } = req.body;

    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Parse tags if they're sent as a string
    let parsedTags = image.tags;
    if (tags !== undefined) {
      parsedTags =
        typeof tags === "string"
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : tags;
    }

    // If new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(image.cloudinaryId);

      // Upload new image directly (without Sharp for now)
      const uploadResult = await uploadToCloudinary(req.file.buffer);

      // Update image-related fields
      image.imageUrl = uploadResult.secure_url;
      image.cloudinaryId = uploadResult.public_id;
      image.fileSize = req.file.size;
    }

    // Update other fields
    if (title !== undefined) image.title = title;
    if (description !== undefined) image.description = description;
    if (category !== undefined) image.category = category;
    if (tags !== undefined) image.tags = parsedTags;
    if (status !== undefined) image.status = status;
    if (order !== undefined) image.order = order;

    await image.save();

    res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating gallery image",
      error: error.message,
    });
  }
};

// Delete gallery image
const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from database
    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting gallery image",
      error: error.message,
    });
  }
};

// Update image status
const updateImageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be active or inactive",
      });
    }

    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Image ${
        status === "active" ? "activated" : "deactivated"
      } successfully`,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating image status",
      error: error.message,
    });
  }
};

// Bulk operations
const bulkUpdateImages = async (req, res) => {
  try {
    const { ids, action, data } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Image IDs array is required",
      });
    }

    let updateData = {};

    switch (action) {
      case "status":
        if (!["active", "inactive"].includes(data.status)) {
          return res.status(400).json({
            success: false,
            message: "Invalid status",
          });
        }
        updateData.status = data.status;
        break;

      case "category":
        updateData.category = data.category;
        break;

      case "delete":
        // Delete multiple images
        const imagesToDelete = await Gallery.find({ _id: { $in: ids } });

        // Delete from Cloudinary
        for (const image of imagesToDelete) {
          await cloudinary.uploader.destroy(image.cloudinaryId);
        }

        // Delete from database
        await Gallery.deleteMany({ _id: { $in: ids } });

        return res.status(200).json({
          success: true,
          message: `${imagesToDelete.length} images deleted successfully`,
        });

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid action",
        });
    }

    const result = await Gallery.updateMany({ _id: { $in: ids } }, updateData);

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} images updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error performing bulk operation",
      error: error.message,
    });
  }
};

// Get gallery statistics
const getGalleryStats = async (req, res) => {
  try {
    const totalImages = await Gallery.countDocuments();
    const activeImages = await Gallery.countDocuments({ status: "active" });
    const inactiveImages = await Gallery.countDocuments({ status: "inactive" });

    const categoryCounts = await Gallery.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const recentImages = await Gallery.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title imageUrl createdAt");

    res.status(200).json({
      success: true,
      data: {
        total: totalImages,
        active: activeImages,
        inactive: inactiveImages,
        categories: categoryCounts,
        recent: recentImages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching gallery statistics",
      error: error.message,
    });
  }
};

// Single module.exports with all functions
module.exports = {
  upload,
  getAllGalleryImages,
  getGalleryImage,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  updateImageStatus,
  bulkUpdateImages,
  getGalleryStats,
};
