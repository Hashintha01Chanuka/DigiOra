import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  ExternalLink,
  Trash2,
  Edit,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5001/api";

const AddVideo = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    isActive: true,
    thumbnail: null,
  });

  const modalRef = useRef(null);

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Generate YouTube thumbnail URL
  const getYouTubeThumbnail = (url) => {
    const videoId = extractYouTubeId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/videos`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setYoutubeVideos(data.data);
      } else {
        console.error("Failed to fetch videos:", data.message);
        setYoutubeVideos([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setYoutubeVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setEditingVideo(null);
      }
    };

    if (showAddModal || editingVideo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddModal, editingVideo]);

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewVideo({ ...newVideo, thumbnail: file });
    }
  };

  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.youtubeUrl) {
      alert("Please fill in the title and YouTube URL");
      return;
    }

    const videoId = extractYouTubeId(newVideo.youtubeUrl);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", newVideo.title);
      formData.append("description", newVideo.description);
      formData.append("youtubeUrl", newVideo.youtubeUrl);
      formData.append("isActive", newVideo.isActive.toString());

      if (newVideo.thumbnail) {
        formData.append("thumbnail", newVideo.thumbnail);
      }

      const url = editingVideo
        ? `${API_BASE_URL}/videos/${editingVideo._id}`
        : `${API_BASE_URL}/videos`;

      const method = editingVideo ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert(
          editingVideo
            ? "Video updated successfully!"
            : "Video added successfully!"
        );
        await fetchVideos();
        setNewVideo({
          title: "",
          description: "",
          youtubeUrl: "",
          isActive: true,
          thumbnail: null,
        });
        setShowAddModal(false);
        setEditingVideo(null);
      } else {
        alert(data.message || "Error saving video");
      }
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Error saving video. Please check your connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditVideo = (video) => {
    setNewVideo({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      isActive: video.isActive,
      thumbnail: null,
    });
    setEditingVideo(video);
    setShowAddModal(true);
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          alert("Video deleted successfully!");
          await fetchVideos();
        } else {
          alert(data.message || "Error deleting video");
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Error deleting video");
      }
    }
  };

  const handleToggleStatus = async (videoId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${videoId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchVideos();
      } else {
        alert(data.message || "Error updating video status");
      }
    } catch (error) {
      console.error("Error updating video status:", error);
      alert("Error updating video status");
    }
  };

  const openYouTubeVideo = async (video) => {
    try {
      await fetch(`${API_BASE_URL}/videos/${video._id}/view`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }

    window.open(video.youtubeUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              YouTube Video Management
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Add YouTube Video</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Play className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Videos
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {youtubeVideos.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ExternalLink className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {youtubeVideos.reduce(
                    (sum, video) => sum + (video.views || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative group cursor-pointer">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                  onClick={() => openYouTubeVideo(video)}
                />

                {/* Play Button Overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => openYouTubeVideo(video)}
                >
                  <div className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                 
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditVideo(video);
                      }}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVideo(video._id);
                      }}
                      className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {video.views || 0} views
                    </span>
                    <button
                      onClick={() => openYouTubeVideo(video)}
                      className="text-red-600 hover:text-red-700 flex items-center space-x-1 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Video Card */}
          <div
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <div className="h-48 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">Add YouTube Video</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingVideo ? "Edit YouTube Video" : "Add New YouTube Video"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL *
                </label>
                <input
                  type="url"
                  value={newVideo.youtubeUrl}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, youtubeUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {newVideo.youtubeUrl &&
                  extractYouTubeId(newVideo.youtubeUrl) && (
                    <div className="mt-2">
                      <img
                        src={getYouTubeThumbnail(newVideo.youtubeUrl)}
                        alt="YouTube thumbnail"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  rows="3"
                  placeholder="Enter description"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newVideo.isActive}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, isActive: e.target.checked })
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 text-sm text-gray-700"
                >
                  Active (Show on website)
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingVideo(null);
                  setNewVideo({
                    title: "",
                    description: "",
                    youtubeUrl: "",
                    isActive: true,
                    thumbnail: null,
                  });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddVideo}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={uploading}
              >
                {uploading
                  ? editingVideo
                    ? "Updating..."
                    : "Adding..."
                  : editingVideo
                  ? "Update Video"
                  : "Add Video"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVideo;