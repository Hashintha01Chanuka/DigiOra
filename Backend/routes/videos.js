const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Video = require("../models/Video");

// Cloudinary storage configuration for thumbnails
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "digiora/video-thumbnails", // Custom thumbnails saved here
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 800, height: 450, crop: "fill", quality: "auto" },
    ],
  },
});

const upload = multer({ storage: storage });

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to generate YouTube thumbnail URL
const getYouTubeThumbnail = (url) => {
  const videoId = extractYouTubeId(url);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
};

// GET /api/videos - Get all videos
router.get("/", async (req, res) => {
  try {
    const { isActive, limit } = req.query;

    let query = {};
    if (isActive !== undefined) query.isActive = isActive === "true";

    let videosQuery = Video.find(query).sort({ order: 1, createdAt: -1 });

    if (limit) {
      videosQuery = videosQuery.limit(parseInt(limit));
    }

    const videos = await videosQuery;

    res.json({
      success: true,
      data: videos,
      count: videos.length,
    });
  } catch (error) {
    // error handling
  }
});
// GET /api/videos/:id - Get single video
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching video",
    });
  }
});

// POST /api/videos - Create new video
router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, description, youtubeUrl, isActive } = req.body;

    // Validate YouTube URL
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL",
      });
    }

    // Use custom thumbnail if uploaded, otherwise use YouTube thumbnail
    let thumbnailUrl;
    if (req.file) {
      thumbnailUrl = req.file.path; // This is the Cloudinary URL for custom thumbnail
    } else {
      thumbnailUrl = getYouTubeThumbnail(youtubeUrl); // This uses YouTube's thumbnail
    }

    // Get the highest order number for the section
    const lastVideo = await Video.findOne().sort({ order: -1 });
    const order = lastVideo ? lastVideo.order + 1 : 0;

    const video = new Video({
      title,
      description: description || "",
      youtubeUrl,
      youtubeId,
      thumbnailUrl, // Either Cloudinary URL or YouTube URLstored separately
      isActive: isActive !== undefined ? isActive === "true" : true,
      order,
    });

    await video.save();

    res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({
      success: false,
      message: "Error creating video",
    });
  }
});

// PUT /api/videos/:id - Update video
router.put("/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, description, youtubeUrl, isActive } = req.body;

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Update YouTube URL if provided
    if (youtubeUrl && youtubeUrl !== video.youtubeUrl) {
      const youtubeId = extractYouTubeId(youtubeUrl);
      if (!youtubeId) {
        return res.status(400).json({
          success: false,
          message: "Invalid YouTube URL",
        });
      }
      video.youtubeUrl = youtubeUrl;
      video.youtubeId = youtubeId;

      // Update thumbnail if no custom thumbnail is uploaded
      if (!req.file) {
        video.thumbnailUrl = getYouTubeThumbnail(youtubeUrl);
      }
    }

    // Update thumbnail if uploaded
    if (req.file) {
      video.thumbnailUrl = req.file.path;
    }

    // Update other fields
    if (title) video.title = title;
    if (description !== undefined) video.description = description;
    if (isActive !== undefined) video.isActive = isActive === "true";

    await video.save();

    res.json({
      success: true,
      message: "Video updated successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({
      success: false,
      message: "Error updating video",
    });
  }
});

// DELETE /api/videos/:id - Delete video
router.delete("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // No custom thumbnail logic needed—just delete the video
    await Video.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting video",
    });
  }
});

// PATCH /api/videos/:id/status - Update video status
router.patch("/:id/status", async (req, res) => {
  try {
    const { isActive } = req.body;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { isActive: isActive === "true" },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video status updated successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error updating video status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating video status",
    });
  }
});

// PATCH /api/videos/:id/order - Update video order
router.patch("/:id/order", async (req, res) => {
  try {
    const { order } = req.body;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { order: parseInt(order) },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video order updated successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error updating video order:", error);
    res.status(500).json({
      success: false,
      message: "Error updating video order",
    });
  }
});

// POST /api/videos/:id/view - Increment view count
router.post("/:id/view", async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      data: { views: video.views },
    });
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({
      success: false,
      message: "Error updating view count",
    });
  }
});

module.exports = router;
