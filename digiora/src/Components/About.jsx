import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

import {
  CheckCircle,
  Users,
  Target,
  TrendingUp,
  Award,
  ArrowRight,
  Lightbulb,
  Shield,
  Clock,
  Globe,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Heart,
  Zap,
  Eye,
  ExternalLink,
  X,
  ChevronLeft,
  Camera,
} from "lucide-react";

const AboutUsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Base URL configuration
  const API_BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "VITE_BACKEND_URL/api";

  useEffect(() => {
    // Add styles to document head instead of using jsx prop
    const styles = `
      .scroll-animation { 
        opacity: 0; 
        transform: translateY(40px); 
        transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
      }
      .animate-in { 
        opacity: 1; 
        transform: translateY(0);
      }
      .delay-200 { transition-delay: 200ms; }
      .delay-400 { transition-delay: 400ms; }
      .delay-600 { transition-delay: 600ms; }
      .delay-800 { transition-delay: 800ms; }
      .btn-hover { 
        transition: all 0.3s ease; 
      }
      .btn-hover:hover { 
        transform: translateY(-2px); 
        box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3); 
      }
      .card-hover { 
        transition: all 0.3s ease; 
      }
      .card-hover:hover { 
        transform: translateY(-5px); 
        box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
      }
      .gradient-text { 
        background: linear-gradient(135deg, #dc2626, #b91c1c); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent; 
        background-clip: text; 
      }
      .image-zoom { 
        transition: transform 0.3s ease; 
      }
      .image-zoom:hover { 
        transform: scale(1.05); 
      }
      .modal-overlay { 
        backdrop-filter: blur(10px); 
      }
      .masonry-grid { 
        columns: 1; 
        column-gap: 1.5rem; 
      }
      @media (min-width: 768px) { 
        .masonry-grid { 
          columns: 2; 
        } 
      }
      @media (min-width: 1024px) { 
        .masonry-grid { 
          columns: 3; 
        } 
      }
      .masonry-item { 
        break-inside: avoid; 
        margin-bottom: 1.5rem; 
        display: block !important;
        visibility: visible !important;
      }
      .gallery-overlay { 
        background: linear-gradient(45deg, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9)); 
      }
      .gallery-filter { 
        backdrop-filter: blur(20px); 
        -webkit-backdrop-filter: blur(20px); 
      }
      .floating-action { 
        animation: float 3s ease-in-out infinite; 
      }
      @keyframes float { 
        0%, 100% { transform: translateY(0px); } 
        50% { transform: translateY(-10px); } 
      }
      .gallery-image {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

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

    return () => {
      document
        .querySelectorAll(".scroll-animation")
        .forEach((el) => observer.unobserve(el));
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery?status=active`);
      if (response.ok) {
        const data = await response.json();
        console.log("Gallery API Response:", data);

        if (data.success && data.data && Array.isArray(data.data)) {
          const activeImages = data.data
            .map((image, index) => {
              // Add more debugging
              console.log("Processing image:", image);

              return {
                id: image._id || `image-${index}`,
                image: image.imageUrl || image.url || image.secure_url,
                alt: image.title || `Gallery Image ${index + 1}`,
                category: image.category || "Uncategorized",
                description: image.description || "",
              };
            })
            .filter((img) => {
              // Filter out images without valid URLs and log them
              if (!img.image) {
                console.warn("Image filtered out - no URL:", img);
                return false;
              }
              return true;
            });

          setGalleryImages(activeImages);
          console.log("Final processed images:", activeImages);
        } else {
          console.warn("Invalid response format:", data);
          throw new Error("Invalid response format");
        }
      } else {
        console.error(
          "API Response not OK:",
          response.status,
          response.statusText
        );
        throw new Error(`Failed to fetch gallery images: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error);

      // Enhanced fallback with more diverse images
      const fallbackImages = [
        {
          id: "fallback-1",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Digital Marketing Strategy",
          category: "Digital Marketing Campaign",
          description: "Comprehensive digital marketing strategy showcase",
        },
        {
          id: "fallback-2",
          image:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Brand Design Project",
          category: "Brand Design Project",
          description: "Modern brand identity solutions",
        },
        {
          id: "fallback-3",
          image:
            "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Social Media Content",
          category: "Social Media Content",
          description: "Engaging social media campaigns",
        },
      ];

      setGalleryImages(fallbackImages);
      console.log("Using fallback images due to API error");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "25+", label: "Clients Served", icon: Users },
    { number: "95%", label: "Success Rate", icon: Target },
    { number: "10+", label: "Years Experience", icon: Calendar },
    { number: "5+", label: "Team Members", icon: Heart },
  ];

  const values = [
    {
      icon: Eye,
      title: "Vision",
      description:
        "To be the leading digital marketing agency that transforms businesses through innovative technology and creative excellence.",
    },
    {
      icon: Target,
      title: "Mission",
      description:
        "Empowering businesses to reach their full potential through strategic digital marketing solutions that deliver measurable results.",
    },
    {
      icon: Heart,
      title: "Values",
      description:
        "Innovation, integrity, collaboration, and client success drive everything we do at DigiOra Media.",
    },
  ];

  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % galleryImages.length
        : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleCTAAction = (action) => {
    switch (action) {
      case "consultation":
        const whatsappNumber = "94778500989";
        const message =
          "Hello DigiOra Media! I would like to get started with your digital marketing services.";
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "call":
        window.open("tel:+94778500989", "_self");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animation">
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                About <span className="font-bold">DigiOra Media</span>
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">
                We are digital marketing pioneers, transforming businesses
                through innovative strategies and cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4"></div>
            </div>
            <div className="scroll-animation delay-400">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Our Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Strategic Innovation</div>
                      <div className="text-white/80">
                        Cutting-edge strategies
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Expert Team</div>
                      <div className="text-white/80">5+ professionals</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Proven Results</div>
                      <div className="text-white/80">
                        25+ successful projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="scroll-animation mb-8">
                <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6">
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                  Driven To{" "}
                  <span className="gradient-text font-bold">Inspire</span>
                </h2>
              </div>
              <p className="scroll-animation delay-200 text-xl text-gray-600 mb-6 leading-relaxed font-light">
                We are thought leaders and self-starters with a passion for
                uncovering hidden potential in digital marketing technology.
              </p>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                At DigiOra Media, we champion innovation by partnering with the
                best minds in the industry to deliver comprehensive digital
                marketing solutions that drive measurable results.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <Lightbulb className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Strategic Innovation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Cutting-edge digital marketing strategies that set new
                      industry standards and drive unprecedented growth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Results-Driven Approach
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every campaign is meticulously designed to deliver
                      measurable ROI and sustainable business growth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <Globe className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Global Perspective
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Local expertise combined with global reach and
                      international best practices for maximum impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="h-36 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center group hover:from-red-100 hover:to-red-200 transition-all duration-300">
                    <Users className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="h-56 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center group hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg">
                    <Target className="w-14 h-14 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
                    <TrendingUp className="w-14 h-14 text-gray-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="h-36 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg">
                    <Award className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-gradient-to-br from-red-50 via-white to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Founder Information */}
            <div className="scroll-animation">
              <div className="mb-8">
                <div className="inline-block px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-full mb-6">
                  Meet Our Founder
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                  Visionary Behind{" "}
                  <span className="gradient-text font-bold">DigiOra Media</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Kalindu Kaveesha
                  </h3>
                  <p className="text-red-600 font-semibold mb-4">
                    CEO & Founder
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Kalindu Kaveesha is the founder of DigiOra Media Solutions
                    (Pvt) Ltd, bringing over seven years of expertise in the
                    social media and digital content industry. A B.Com (Special)
                    graduate from the University of Sri Jayawardenepura, Kalindu
                    seamlessly integrates business insight with creative
                    storytelling to develop impactful digital strategies.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    As an accomplished entrepreneur and freelance photographer
                    and videographer, he is dedicated to producing high-quality
                    content that captivates audiences and strengthens brand
                    presence. Kalindu’s vision is to drive innovation in the
                    digital media landscape, delivering solutions that enable
                    businesses to effectively engage and connect with their
                    target markets.{" "}
                  </p>
                </div>

                {/* Quote */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl text-white">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-red-200">"</div>
                    <div>
                      <p className="text-lg italic leading-relaxed mb-4">
                        "At DigiOra Media, we don't just create campaigns – we
                        craft digital experiences that transform businesses and
                        drive meaningful connections between brands and their
                        customers."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">Kalindu Kaveesha</p>
                          <p className="text-red-200 text-sm">CEO & Founder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Founder Photo */}
            <div className="scroll-animation delay-400">
              <div className="relative">
                {/* Main Photo Container */}
                <div className="relative bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-4 shadow-2xl">
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={assets.ceo}
                      alt="Kalindu Kaveesha - CEO & Founder"
                      className="w-full h-200 object-cover "
                    />

                    {/* Overlay with company logo/badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">
                          DigiOra
                        </div>
                        <div className="text-xs text-gray-600">Founder</div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Our <span className="gradient-text font-bold">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that speak to our commitment to excellence and client
              success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="scroll-animation card-hover bg-white p-8 rounded-2xl text-center shadow-lg"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Our <span className="gradient-text font-bold">Foundation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at DigiOra Media.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="scroll-animation card-hover bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="scroll-animation">
              <h2 className="text-4xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
                Visual{" "}
                <span className="gradient-text font-bold">Masterpieces</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Step into our world of creativity where digital marketing meets
                artistic excellence. Each piece tells a story of innovation and
                success.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Debug Information */}

          {/* Enhanced Gallery Grid with Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading our creative gallery...</p>
              </div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Gallery Coming Soon
              </h3>
              <p className="text-gray-600">
                We're preparing amazing visuals to showcase our work.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => {
                console.log("Rendering image:", index, image);

                // Extra validation before rendering
                if (!image || !image.image) {
                  console.warn(
                    "Skipping invalid image at index:",
                    index,
                    image
                  );
                  return null;
                }

                return (
                  <div
                    key={image.id || index}
                    className="gallery-image bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] group cursor-pointer"
                    style={{
                      display: "block",
                      visibility: "visible",
                      opacity: 1,
                      transitionDelay: `${index * 150}ms`,
                    }}
                    onClick={() => openImageModal(image, index)}
                  >
                    <div className="relative overflow-hidden rounded-3xl">
                      <div
                        className="relative overflow-hidden"
                        style={{
                          height: "280px",
                          backgroundColor: "#f3f4f6",
                        }}
                      >
                        <img
                          src={image.image}
                          alt={image.alt || "Gallery Image"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onLoad={() => {
                            console.log(
                              "✅ Image loaded and displayed:",
                              image.alt,
                              image.image
                            );
                          }}
                          onError={(e) => {
                            console.warn(
                              "❌ Image failed to load:",
                              image.image
                            );
                            console.log("Trying fallback image...");
                            e.target.src =
                              "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                        {/* Interactive Overlay */}
                        <div className="absolute inset-0 gallery-overlay opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                          <div className="text-center text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="floating-action w-12 h-12 bg-white/20 gallery-filter rounded-full flex items-center justify-center mx-auto mb-3">
                              <ExternalLink className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-xs opacity-75">
                              Click to view full size
                            </p>
                          </div>
                        </div>

                        {/* Corner Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 gallery-filter text-red-600 text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0">
                          {index + 1}/{galleryImages.length}
                        </div>
                      </div>

                      {/* Image Details */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Gallery Actions */}
          <div className="text-center mt-16">
            <div className="scroll-animation">
              {galleryImages.length > 0 && (
                <p className="text-gray-600 mb-6"></p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section 
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Meet Our <span className="gradient-text font-bold">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented professionals behind our success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="scroll-animation card-hover bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl text-center" style={{transitionDelay: `${index * 200}ms`}}>
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-red-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-animation">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Ready to <span className="font-bold">Transform</span> Your
              Business?
            </h2>
            <p className="text-xl font-light mb-8 max-w-2xl mx-auto">
              Let's discuss how DigiOra Media can help you achieve your digital
              marketing goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleCTAAction("consultation")}
                className="btn-hover inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleCTAAction("call")}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-red-600 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/95"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls */}
            <div className="absolute top-6 right-6 z-20 flex gap-3">
              <button
                onClick={closeImageModal}
                className="w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation Controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>

                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}

            {/* Modal Content */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  onError={(e) => {
                    console.warn(
                      "Modal image failed to load:",
                      selectedImage.image
                    );
                    e.target.src =
                      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Gallery Item {currentImageIndex + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Viewing {currentImageIndex + 1} of {galleryImages.length}{" "}
                      images
                    </p>
                  </div>
                  <div className="flex gap-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUsPage;
