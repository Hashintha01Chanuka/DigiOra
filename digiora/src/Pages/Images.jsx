import React, { useState, useEffect } from "react";
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "VITE_BACKEND_URL";

  const IMAGES_PER_PAGE = 12;

  useEffect(() => {
    fetchImages();
  }, [currentPage]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/api/images`, {
        params: { page: currentPage, limit: IMAGES_PER_PAGE },
      });

      if (response.data.success) {
        // Adjusted to match your backend response structure:
        setImages(response.data.data || []); // data is an array of images
        setTotalImages(
          response.data.totalCount || response.data.data.length || 0
        );
      } else {
        setImages([]);
        setTotalImages(0);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load images.");
      setImages([]);
      setTotalImages(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading images...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6 border border-red-100">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Project{" "}
            <span className="font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful digital marketing campaigns and
            creative solutions that have helped businesses thrive.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center mb-8 text-red-600 font-semibold">
            {error}
          </div>
        )}

        {/* Images Grid */}
        {images.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Images Yet
            </h3>
            <p className="text-gray-500">
              Images will appear here once they are uploaded through the admin
              panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {images.slice(0, 7).map((image, index) => {
              let gridStyles = "";

              switch (index) {
                case 0:
                  gridStyles = "col-span-2 row-span-2 h-90";
                  break;
                case 1:
                  gridStyles = "col-span-1 h-90";
                  break;
                case 2:
                  gridStyles = "col-span-1 h-90";
                  break;
                case 3:
                  gridStyles = "col-span-1 h-0";
                  break;
                case 4:
                  gridStyles = "col-span-2 h-130";
                  break;
                case 5:
                  gridStyles = "col-span-2 h-130";
                  break;
                case 6:
                  gridStyles = "col-span-1 h-90";
                  break;
                default:
                  gridStyles = "col-span-1 h-32";
              }

              return (
                <div
                  key={image.public_id || image._id}
                  className={`relative overflow-hidden shadow-lg bg-white ${gridStyles} rounded-lg`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.public_id || image._id}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-12 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-600 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 border"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-gray-600 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 border"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Images;
