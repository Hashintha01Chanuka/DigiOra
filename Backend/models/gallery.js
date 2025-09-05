const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Digital Marketing Campaign",
        "Brand Design Project",
        "Social Media Content",
        "SEO Analytics Dashboard",
        "Mobile App Interface",
        "Business Strategy Session",
        "Data Analytics",
        "Creative Design Process",
        "Team Collaboration",
        "Website Development",
        "Content Creation",
        "Email Marketing",
      ],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
    dimensions: {
      width: Number,
      height: Number,
    },
    fileSize: {
      type: Number, // in bytes
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
gallerySchema.index({ status: 1, order: 1 });
gallerySchema.index({ category: 1 });

module.exports = mongoose.model("Gallery", gallerySchema);
