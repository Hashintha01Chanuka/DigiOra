const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const path = require("path");

// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ================== Middleware ==================
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5174", // Add admin panel port
      "http://localhost:3000", // Add common React port
      "VITE_BACKEND_URL", // Add backend port for testing
      "https://digi-ora-frontend.vercel.app",
      "https://www.digioramedia.com",
      "https://digi-ora-admin.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.path.includes("gallery")) {
    console.log("🔍 Gallery request detected:", req.path, req.query);
  }
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running on Vercel!",
  });
});

// ================== Routes ==================
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/images", require("./routes/images"));
app.use("/api/videos", require("./routes/videos"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/services", require("./routes/services"));
app.use("/api/newsletter", require("./routes/newsletter"));

// Test route to check if gallery model works
app.get("/api/test-gallery", async (req, res) => {
  try {
    const Gallery = require("./models/gallery");
    const count = await Gallery.countDocuments();
    const sampleData = await Gallery.find().limit(3);

    console.log("🧪 Test gallery response:", {
      count,
      sampleUrls: sampleData.map((img) => ({
        title: img.title,
        imageUrl: img.imageUrl,
        status: img.status,
      })),
    });

    res.json({
      success: true,
      message: `Gallery collection exists with ${count} documents`,
      count,
      sampleData: sampleData.map((img) => ({
        id: img._id,
        title: img.title,
        imageUrl: img.imageUrl,
        status: img.status,
        category: img.category,
      })),
    });
  } catch (error) {
    console.error("❌ Test gallery error:", error);
    res.json({
      success: false,
      error: error.message,
      message: "Gallery model connection failed",
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================== Start Server ==================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(
    `☁️  Cloudinary configured: ${
      process.env.CLOUDINARY_CLOUD_NAME ? "Yes" : "No"
    }`
  );

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.log(
      "⚠️  Warning: Cloudinary not configured. Image uploads will fail."
    );
  }
});
