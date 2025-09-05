const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    youtubeId: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
videoSchema.index({ section: 1, isActive: 1, order: 1 });

module.exports = mongoose.model("Video", videoSchema);
videoSchema.index({ section: 1, isActive: 1, order: 1 });

module.exports = mongoose.model("Video", videoSchema);
