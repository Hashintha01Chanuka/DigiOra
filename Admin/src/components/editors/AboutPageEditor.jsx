import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  Save,
  Eye,
  ImageIcon,
  Calendar,
  Star,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Check,
  Camera,
  Palette,
  Sparkles,
  Grid3X3,
  List,
  MoreVertical,
  Download,
  Share2,
} from "lucide-react";

const AboutPageEditor = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [stats, setStats] = useState({});
  const [formData, setFormData] = useState({
    alt: "",
    category: "",
    description: "",
    tags: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  const categories = [
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
  ];

  // API Base URL configuration
  const API_BASE_URL = "VITE_BACKEND_URL/api";

  useEffect(() => {
    loadGalleryImages();
    loadStats();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 4000);
  };

  const loadGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setGalleryImages(data.data || []);
          showNotification("Gallery images loaded successfully!");
        } else {
          throw new Error(data.message || "Failed to load gallery images");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load gallery images");
      }
    } catch (error) {
      console.error("Error loading gallery images:", error);
      // Fallback to mock data only in development
      if (process.env.NODE_ENV === "development") {
        // Mock data
        const mockData = [
          {
            _id: 1,
            imageUrl:
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Digital Marketing Strategy",
            category: "Digital Marketing Campaign",
            description:
              "Comprehensive digital marketing strategy showcase with modern analytics dashboard",
            tags: ["marketing", "strategy", "digital", "analytics"],
            createdAt: "2024-01-15",
            status: "active",
            fileSize: 2400000,
            dimensions: { width: 1920, height: 1080 },
          },
          {
            _id: 2,
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Brand Identity Design",
            category: "Brand Design Project",
            description:
              "Modern brand identity and design solutions for corporate clients",
            tags: ["branding", "design", "identity", "corporate"],
            createdAt: "2024-01-14",
            status: "active",
            fileSize: 3100000,
            dimensions: { width: 1600, height: 900 },
          },
        ];
        setGalleryImages(mockData);
        showNotification(
          "Using offline data. Please check your connection.",
          "warning"
        );
      } else {
        showNotification(
          "Error loading gallery images. Please try again.",
          "error"
        );
      }
    }
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  // File handling functions
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        showNotification(`${file.name} is not an image file`, "error");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        showNotification(`${file.name} is too large (max 5MB)`, "error");
        return false;
      }
      return true;
    });

    const newFiles = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  // Drag & Drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Upload multiple images
  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      showNotification("Please select at least one image", "error");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (fileObj, index) => {
        const formData = new FormData();
        formData.append("image", fileObj.file);
        formData.append(
          "title",
          fileObj.name.split(".")[0].replace(/[_-]/g, " ")
        ); // Use filename as title
        formData.append("category", "Digital Marketing Campaign"); // Default category
        formData.append("description", "");
        formData.append("tags", "");

        const response = await fetch(`${API_BASE_URL}/gallery`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Upload failed");
        }

        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      const successful = results.filter((result) => result.success);

      if (successful.length > 0) {
        selectedFiles.forEach((fileObj) =>
          URL.revokeObjectURL(fileObj.preview)
        );
        setSelectedFiles([]);
        showNotification(
          `Successfully uploaded ${successful.length} image(s)!`
        );
        loadGalleryImages();
        loadStats();
      } else {
        throw new Error("All uploads failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      showNotification(
        error.message || "Upload failed. Please try again.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery image?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setGalleryImages((prev) => prev.filter((img) => img._id !== id));
          showNotification("Gallery image deleted successfully!");
          loadStats();
        } else {
          throw new Error("Failed to delete image");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        showNotification("Error deleting gallery image.", "error");
      }
    }
  };

  const toggleStatus = async (id) => {
    try {
      const image = galleryImages.find((img) => img._id === id);
      const newStatus = image.status === "active" ? "inactive" : "active";

      const response = await fetch(`${API_BASE_URL}/gallery/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setGalleryImages((prev) =>
          prev.map((img) =>
            img._id === id ? { ...img, status: newStatus } : img
          )
        );
        showNotification(
          `Image ${
            newStatus === "active" ? "activated" : "deactivated"
          } successfully!`
        );
        loadStats();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification("Error updating status. Please try again.", "error");
    }
  };

  const handleBulkAction = async () => {
    if (selectedImages.length === 0) {
      showNotification("Please select images first", "error");
      return;
    }

    if (!bulkAction) {
      showNotification("Please select an action", "error");
      return;
    }

    try {
      let requestData = { ids: selectedImages, action: bulkAction };

      if (bulkAction === "status") {
        const status = prompt("Enter status (active/inactive):");
        if (!status || !["active", "inactive"].includes(status)) {
          showNotification("Invalid status", "error");
          return;
        }
        requestData.data = { status };
      } else if (bulkAction === "category") {
        const category = prompt("Enter new category:");
        if (!category || !categories.includes(category)) {
          showNotification("Invalid category", "error");
          return;
        }
        requestData.data = { category };
      }

      const response = await fetch(`${API_BASE_URL}/gallery/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSelectedImages([]);
        setBulkAction("");
        loadGalleryImages();
        loadStats();
        showNotification("Bulk action completed successfully!");
      } else {
        throw new Error("Failed to perform bulk action");
      }
    } catch (error) {
      showNotification(
        "Error performing bulk action. Please try again.",
        "error"
      );
    }
  };

  const handleImageSelect = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
  };

  const selectAllImages = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map((img) => img._id));
    }
  };

  const openEditModal = (image) => {
    setEditingImage(image);
    setFormData({
      alt: image.title,
      category: image.category,
      description: image.description,
      tags: Array.isArray(image.tags) ? image.tags.join(", ") : image.tags,
      image: null,
    });
    setImagePreview(image.imageUrl);
    setIsModalOpen(true);
  };

  const handleUpdateImage = async () => {
    if (!editingImage) return;

    try {
      const updateFormData = new FormData();
      updateFormData.append("title", formData.alt);
      updateFormData.append("category", formData.category);
      updateFormData.append("description", formData.description);
      updateFormData.append("tags", formData.tags);

      if (formData.image) {
        updateFormData.append("image", formData.image);
      }

      const response = await fetch(
        `${API_BASE_URL}/gallery/${editingImage._id}`,
        {
          method: "PUT",
          body: updateFormData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setGalleryImages((prev) =>
          prev.map((img) => (img._id === editingImage._id ? result.data : img))
        );
        showNotification("Image updated successfully!");
        setIsModalOpen(false);
        loadStats();
      } else {
        throw new Error("Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      showNotification("Error updating image. Please try again.", "error");
    }
  };

  const filteredImages = galleryImages.filter((image) => {
    const searchFields = [
      image.title?.toLowerCase() || "",
      image.description?.toLowerCase() || "",
      Array.isArray(image.tags)
        ? image.tags.join(" ").toLowerCase()
        : image.tags?.toLowerCase() || "",
    ];
    const matchesSearch = searchFields.some((field) =>
      field.includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
      !filterCategory || image.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-500"
              : notification.type === "error"
              ? "bg-red-500"
              : "bg-amber-500"
          } text-white backdrop-blur-sm`}
        >
          <div className="flex-shrink-0">
            {notification.type === "success" ? (
              <Check className="w-5 h-5" />
            ) : notification.type === "error" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
          </div>
          <div className="font-medium">{notification.message}</div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                About Page Gallery Manager
              </h1>
              <p className="text-blue-100 text-lg">
                Complete CRUD operations for About section visual gallery
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                {viewMode === "grid" ? (
                  <List className="w-6 h-6" />
                ) : (
                  <Grid3X3 className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={loadGalleryImages}
                className="px-6 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.total || galleryImages.length}
              </p>
              <p className="text-gray-600">Total Images</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.active ||
                  galleryImages.filter((img) => img.status === "active").length}
              </p>
              <p className="text-gray-600">Active Images</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.categories?.length ||
                  new Set(galleryImages.map((img) => img.category)).size}
              </p>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.inactive ||
                  galleryImages.filter((img) => img.status === "inactive")
                    .length}
              </p>
              <p className="text-gray-600">Inactive Images</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Upload className="w-7 h-7 text-red-600" />
            Upload Gallery Images
          </h2>
        </div>

        {/* Enhanced Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragOver
              ? "border-red-500 bg-blue-50 scale-105"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Drop your masterpieces here
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              or click to browse your creative collection
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Camera className="w-6 h-6 mr-3" />
              Choose Images
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supports JPG, PNG, GIF, WEBP up to 5MB each
            </p>
          </div>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Ready to Upload ({selectedFiles.length} images)
              </h3>
              <button
                onClick={uploadImages}
                disabled={uploading}
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload All
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {selectedFiles.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="bg-gray-50 rounded-xl p-3 relative group hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                    <img
                      src={fileObj.preview}
                      alt={fileObj.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    {formatFileSize(fileObj.size)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your gallery masterpieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
              />
            </div>
          </div>
          <div className="lg:w-64">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={loadGalleryImages}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedImages.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-red-900">
              Bulk Actions ({selectedImages.length} selected)
            </h3>
            <button
              onClick={() => setSelectedImages([])}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Deselect All
            </button>
          </div>
          <div className="flex gap-4">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select action</option>
              <option value="status">Update Status</option>
              <option value="category">Change Category</option>
            </select>
            <button
              onClick={handleBulkAction}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Gallery Images ({filteredImages.length})
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={selectAllImages}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {selectedImages.length === filteredImages.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No images found
            </h3>
            <p className="text-gray-600">Upload some images to get started</p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredImages.map((image) => (
              <div
                key={image._id}
                className={`bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                  selectedImages.includes(image._id)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <div
                  className={`relative ${
                    viewMode === "grid" ? "aspect-video" : "aspect-[3/1]"
                  } overflow-hidden`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image._id)}
                      onChange={() => handleImageSelect(image._id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-bold text-lg mb-1 truncate">
                        {image.title}
                      </h4>
                      <p className="text-sm opacity-90">{image.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(image)}
                      className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <button
                      onClick={() => toggleStatus(image._id)}
                      className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg transition-colors ${
                        image.status === "active"
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {image.status}
                    </button>
                  </div>
                </div>

                {viewMode === "grid" && (
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 truncate">
                      {image.title}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium mb-3">
                      {image.category}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {image.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {new Date(image.createdAt).toLocaleDateString()}
                      </span>
                      <span>{formatFileSize(image.fileSize)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Edit className="w-7 h-7 text-red-600" />
                Edit Gallery Image
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Preview */}
                <div className="space-y-6">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Replace Image (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={formData.alt}
                      onChange={(e) =>
                        setFormData({ ...formData, alt: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter image title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Describe your image..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="marketing, design, creative..."
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateImage}
                      className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPageEditor;
