import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".scroll-animation")
      .forEach((el) => observer.observe(el));
    return () =>
      document
        .querySelectorAll(".scroll-animation")
        .forEach((el) => observer.unobserve(el));
  }, []);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Attempting to fetch videos from database...");
        const response = await fetch(`${API_BASE_URL}/api/videos`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          if (data.data && data.data.length > 0) {
            console.log(`Found ${data.data.length} videos in database`);
            setVideos(data.data);
          } else {
            console.log("No videos found in database");
            // Show empty state or keep loading
            setVideos([]);
          }
        } else {
          console.error("API returned success: false", data.message);
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        console.log(
          "Database fetch failed, check if backend server is running"
        );
        // Only show fallback if there's a network error
        setVideos([]);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = async (video) => {
    // Only increment view count if video has a valid MongoDB _id
    if (video._id && video._id.length === 24) {
      // MongoDB ObjectId is 24 characters
      try {
        await fetch(`${API_BASE_URL}/api/videos/${video._id}/view`, {
          method: "POST",
        });
        console.log(`Incremented view count for video: ${video.title}`);
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    }

    window.open(video.youtubeUrl, "_blank");
  };

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const services = [
    {
      icon: Target,
      title: "Digital Strategy",
      description:
        "Comprehensive digital marketing strategies tailored to your business objectives and market dynamics for sustainable growth.",
      gradient: "from-red-500 to-red-600",
    },
    {
      icon: Users,
      title: "Social Media Marketing",
      description:
        "Engaging social media campaigns that build brand awareness and drive meaningful customer connections across all platforms.",
      gradient: "from-red-400 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "SEO & Analytics",
      description:
        "Advanced search engine optimization and data analytics to maximize your online visibility and deliver measurable ROI.",
      gradient: "from-red-600 to-red-700",
    },
    {
      icon: Award,
      title: "Content Excellence",
      description:
        "High-quality content creation and marketing that resonates with your audience and drives meaningful engagement.",
      gradient: "from-red-500 to-red-600",
    },
  ];

  return (
    <>
      <style jsx global>{`
        .scroll-animation {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-200 {
          transition-delay: 200ms;
        }
        .delay-400 {
          transition-delay: 400ms;
        }
        .delay-600 {
          transition-delay: 600ms;
        }
        .delay-800 {
          transition-delay: 800ms;
        }
        .delay-1000 {
          transition-delay: 1000ms;
        }
        .btn-hover {
          transition: all 0.3s ease;
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
        }
      `}</style>
      <section
        id="services"
        className="scroll-animation py-24 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6 border border-red-100">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              At DigiOra Media We Offer <span className="text-red-600">The Best Of Every World</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              In a complex digital landscape that doesn't stop evolving, we
              champion agility by partnering with the best technologies and
              strategies to deliver exceptional results.
            </p>
            <div className="scroll-animation delay-200">
             
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`scroll-animation delay-${
                  (index + 4) * 200
                } group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-red-200 flex flex-col h-full`}
              >
                <div className="flex-grow">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
              
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="scroll-animation delay-1000 bg-gradient-to-r from-red-500 to-red-600 p-12 rounded-2xl text-white shadow-xl">
              <h3 className="text-3xl font-light mb-6">
                Ready to Transform Your Digital Presence?
              </h3>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how our comprehensive digital marketing solutions
                can drive your business forward.
              </p>
              <button 
                onClick={handleGetStarted}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Today
              </button>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6 border border-red-100">
                Watch Our Work
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Follow Us ON{" "}
                <span className="font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  YOUTUBE
                </span>
              </h2>
              <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed">
                Watch these videos to better understand how we deliver
                exceptional results for our clients.
              </p>
            </div>

            {loadingVideos ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative group cursor-pointer">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                        onClick={() => handleVideoClick(video)}
                      />

                      {/* Play Button Overlay */}
                      <div
                        className="absolute inset-0 bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleVideoClick(video)}
                      >
                        <div className="w-10 h-10 hover:text-red-600 transition-colors">
                          <svg
                            className="w-full h-full text-red-600 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M19.615 3.184A3.005 3.005 0 0 0 17.519 3C15.061 3 12 3 12 3s-3.061 0-5.519.001a3.005 3.005 0 0 0-2.096.184 3.001 3.001 0 0 0-1.399 1.401A31.937 31.937 0 0 0 3 8.481v7.038c0 1.101.039 2.18.186 3.215a3.001 3.001 0 0 0 1.401 1.399c1.034.147 2.113.186 3.214.186h7.038c1.101 0 2.18-.039 3.215-.186a3.001 3.001 0 0 0 1.399-1.401c.147-1.035.186-2.114.186-3.215V8.481a31.937 31.937 0 0 0-.186-3.215 3.001 3.001 0 0 0-1.401-1.399zM9.75 15.5v-7l6 3.5-6 3.5z" />
                          </svg>
                        </div>
                      </div>

                      {/* Custom Thumbnail Badge */}
                      {video.customThumbnail && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Custom
                          </span>
                        </div>
                      )}

                      {/* View Count */}
                      {video.views > 0 && (
                        <div className="absolute bottom-2 left-2"></div>
                      )}
                    </div>

                    <div className="">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVideoClick(video)}
                            className="text-red-600 hover:text-red-700 flex items-center space-x-1 text-sm"
                          ></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Videos Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Videos will appear here once they're added through the admin
                  panel.
                </p>
                <p className="text-sm text-gray-500">
                  Make sure your backend server is running on port 5000
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
