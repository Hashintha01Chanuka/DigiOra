import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  X,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AddImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [editingImageId, setEditingImageId] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch existing images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("VITE_BACKEND_URL/api/images");
      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Use data.data directly (which is an array)
        setUploadedImages(data.data || []);
      } else {
        setUploadedImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setUploadedImages([]);
    }
  };

  // Handle selecting new files for upload
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`);
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

  // Upload multiple images to backend
  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading images...");

    try {
      const uploadPromises = selectedFiles.map(async (fileObj) => {
        const formData = new FormData();
        formData.append("image", fileObj.file);

        const response = await fetch("VITE_BACKEND_URL/api/images/upload", {
          method: "POST",
          body: formData,
        });

        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      const successCount = results.filter((result) => result.success).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        setUploadStatus(
          `Successfully uploaded ${successCount} image(s)${
            failCount > 0 ? `, ${failCount} failed` : ""
          }`
        );
        selectedFiles.forEach((fileObj) =>
          URL.revokeObjectURL(fileObj.preview)
        );
        setSelectedFiles([]);
        fetchImages();
      } else {
        setUploadStatus("All uploads failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus(
        "Upload failed. Please check your connection and try again."
      );
    } finally {
      setUploading(false);
      setTimeout(() => setUploadStatus(""), 5000);
    }
  };

  // Delete image by public_id
  const deleteImage = async (publicId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`VITE_BACKEND_URL/api/images/${publicId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setUploadedImages((prev) =>
          prev.filter((img) => img.public_id !== publicId)
        );
        setUploadStatus("Image deleted successfully");
        fetchImages();
      } else {
        setUploadStatus("Failed to delete image");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setUploadStatus("Failed to delete image");
    }

    setTimeout(() => setUploadStatus(""), 3000);
  };

  // Edit (replace) image
  const handleEditClick = (publicId) => {
    setEditingImageId(publicId);
    fileInputRef.current.value = null; // Reset file input
    fileInputRef.current.click();
  };

  const handleEditFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `VITE_BACKEND_URL/api/images/${editingImageId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setUploadStatus("Image updated successfully");
        fetchImages();
      } else {
        setUploadStatus("Failed to update image");
      }
    } catch (error) {
      console.error("Edit error:", error);
      setUploadStatus("Error updating image");
    }

    setTimeout(() => setUploadStatus(""), 3000);
  };

  // Format bytes to human readable string
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Image Management
        </h1>
        <p className="text-gray-600">
          Upload and manage images for your website
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Upload Images
        </h2>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-red-400 hover:bg-gray-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop images here or click to browse
          </p>
          <p className="text-gray-500 mb-4">
            Supports JPG, PNG, GIF, WEBP up to 5MB each
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
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Select Images
          </label>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Selected Images ({selectedFiles.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {selectedFiles.map((fileObj) => (
                <div key={fileObj.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={fileObj.preview}
                      alt={fileObj.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(fileObj.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${fileObj.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileObj.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileObj.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={uploadImages}
              disabled={uploading}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload {selectedFiles.length} Image
                  {selectedFiles.length !== 1 ? "s" : ""}
                </>
              )}
            </button>
          </div>
        )}

        {/* Upload Status */}
        {uploadStatus && (
          <div
            className={`mt-4 p-4 rounded-lg flex items-center ${
              uploadStatus.match(/successfully|deleted|updated/i)
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
            role="alert"
          >
            {uploadStatus.match(/successfully|deleted|updated/i) ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Uploaded Images Gallery */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Uploaded Images ({uploadedImages.length})
        </h2>

        {uploadedImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {uploadedImages.map((image) => {
              // Find the correct image ID
              const imageId = image.public_id || image._id || image.id;
              // Find the correct image URL - adjust based on your backend response!
              const imageUrl = image.secure_url || image.url || image.imageUrl;

              if (!imageId || !imageUrl) {
                // Skip if critical data missing
                console.warn("Missing image ID or URL for image:", image);
                return null;
              }

              return (
                <div key={imageId} className="group relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={imageId}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleEditClick(imageId)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      title="Edit image"
                      aria-label={`Edit image ${imageId}`}
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteImage(imageId)}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      title="Delete image"
                      aria-label={`Delete image ${imageId}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hidden input for Edit (Replace Image) */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleEditFileChange}
        accept="image/*"
        aria-label="Replace selected image"
      />
    </div>
  );
};

export default AddImage;
