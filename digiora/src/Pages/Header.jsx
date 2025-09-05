import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ArrowRight, Play } from "lucide-react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll to section by id
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 120;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    };

    const observer = new window.IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    const elements = document.querySelectorAll(".scroll-animation");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
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
      `}</style>
      {/* Hero Section */}
      <section
        id="home"
        className="scroll-animation pt-20 relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Dark Leather Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            {/* Dark Leather Base Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-1000 to-black"></div>

            {/* Leather Texture Overlay */}
            <div className="absolute inset-0 opacity-60">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(101, 67, 33, 0.4) 0%, transparent 70%),
                  radial-gradient(circle at 80% 80%, rgba(92, 51, 23, 0.3) 0%, transparent 70%),
                  radial-gradient(circle at 40% 70%, rgba(120, 85, 60, 0.2) 0%, transparent 70%),
                  linear-gradient(45deg, transparent 40%, rgba(101, 67, 33, 0.15) 50%, transparent 60%),
                  linear-gradient(-45deg, transparent 40%, rgba(92, 51, 23, 0.1) 50%, transparent 60%)
                `,
                  backgroundSize:
                    "400px 400px, 300px 300px, 500px 500px, 200px 200px, 250px 250px",
                  animation: "float 25s ease-in-out infinite",
                }}
              ></div>
            </div>

            {/* Leather Stitching Lines */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Horizontal Leather Stitching */}
              <div
                className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-700/60 to-transparent"
                style={{
                  boxShadow:
                    "0 0 4px rgba(180, 83, 9, 0.5), 0 1px 0 rgba(120, 53, 15, 0.8)",
                  animation: "slideRight 12s ease-in-out infinite",
                }}
              ></div>
              <div
                className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-700/50 to-transparent"
                style={{
                  boxShadow:
                    "0 0 4px rgba(180, 83, 9, 0.4), 0 1px 0 rgba(120, 53, 15, 0.7)",
                  animation: "slideLeft 15s ease-in-out infinite",
                }}
              ></div>
              <div
                className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-700/70 to-transparent"
                style={{
                  boxShadow:
                    "0 0 4px rgba(180, 83, 9, 0.6), 0 1px 0 rgba(120, 53, 15, 0.9)",
                  animation: "slideRight 18s ease-in-out infinite",
                }}
              ></div>

              {/* Vertical Leather Stitching */}
              <div
                className="absolute top-0 left-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-red-700/60 to-transparent"
                style={{
                  boxShadow:
                    "0 0 4px rgba(180, 83, 9, 0.5), 1px 0 0 rgba(120, 53, 15, 0.8)",
                }}
              ></div>
              <div
                className="absolute top-0 left-2/3 w-0.5 h-full bg-gradient-to-b from-transparent via-red-700/50 to-transparent"
                style={{
                  boxShadow:
                    "0 0 4px rgba(180, 83, 9, 0.4), 1px 0 0 rgba(120, 53, 15, 0.7)",
                }}
              ></div>
            </div>

            {/* Metallic Silver Balls Orbiting Around Leather Lines */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Balls orbiting around top horizontal line */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-4 h-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 15px rgba(226, 232, 240, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(148, 163, 184, 0.5)",
                    animation: "orbitPath1 8s linear infinite",
                  }}
                ></div>
              </div>

              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-3 h-3 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 12px rgba(226, 232, 240, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(148, 163, 184, 0.4)",
                    animation: "orbitPath2 12s linear infinite reverse",
                  }}
                ></div>
              </div>

              {/* Balls orbiting around middle horizontal line */}
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-5 h-5 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 18px rgba(226, 232, 240, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(148, 163, 184, 0.6)",
                    animation: "orbitPath3 10s linear infinite",
                  }}
                ></div>
              </div>

              <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-3.5 h-3.5 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 14px rgba(226, 232, 240, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(148, 163, 184, 0.5)",
                    animation: "orbitPath4 14s linear infinite reverse",
                  }}
                ></div>
              </div>

              {/* Balls orbiting around bottom horizontal line */}
              <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-4.5 h-4.5 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 16px rgba(226, 232, 240, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(148, 163, 184, 0.6)",
                    animation: "orbitPath1 16s linear infinite reverse",
                  }}
                ></div>
              </div>

              {/* Balls orbiting around vertical lines */}
              <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-3 h-3 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 12px rgba(226, 232, 240, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(148, 163, 184, 0.4)",
                    animation: "orbitPath2 11s linear infinite",
                  }}
                ></div>
              </div>

              <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-4 h-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 0 15px rgba(226, 232, 240, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(148, 163, 184, 0.5)",
                    animation: "orbitPath3 13s linear infinite reverse",
                  }}
                ></div>
              </div>
            </div>

            {/* Additional Floating Metallic Balls */}
            <div className="absolute inset-0">
              <div
                className="absolute top-1/5 left-1/5 w-2 h-2 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"
                style={{
                  boxShadow:
                    "0 0 10px rgba(226, 232, 240, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  animation: "float 7s ease-in-out infinite",
                }}
              ></div>
              <div
                className="absolute top-4/5 right-1/5 w-2.5 h-2.5 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-full shadow-lg"
                style={{
                  boxShadow:
                    "0 0 12px rgba(226, 232, 240, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                  animation: "float 9s ease-in-out infinite",
                }}
              ></div>
              <div
                className="absolute bottom-1/5 left-3/5 w-1.5 h-1.5 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"
                style={{
                  boxShadow:
                    "0 0 8px rgba(226, 232, 240, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
                  animation: "float 8s ease-in-out infinite",
                }}
              ></div>
            </div>

            {/* Dark Leather Grain Texture */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leatherFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0.3 0.2 0.1 0 0 0.2 0.1 0.05 0 0 0.1 0.05 0.02 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leatherFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
                animation: "noiseMove 30s ease-in-out infinite alternate",
              }}
            ></div>

            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="py-20 text-center">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-red-700/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-red-700/30">
                Digital Marketing Excellence
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
              Delivering Inspired Solutions to
              <span className="block font-normal bg-gradient-to-r from-red-300 to-red-100 bg-clip-text text-transparent">
                Digital Brands
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Driven by curiosity, DigiOra Media creates digital marketing
              strategies to address unmet needs in the modern business
              landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection("services")}
                className="group bg-red-600 text-white px-8 py-4 text-lg font-medium hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 rounded-xl"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-red-600 text-white px-8 py-4 text-lg font-medium hover:bg-red-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 rounded-xl backdrop-blur-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video/Image Section */}
      {/* <section className="scroll-animation bg-red-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video bg-gradient-to-br from-red-600 via-red-700 to-transparent rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-center text-white z-10">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-white/20 transition-all duration-300 group">
                    <Play className="w-12 h-12 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-light mb-4">
                  Digital Marketing Excellence
                </h2>
                <p className="text-xl text-red-100 max-w-2xl mx-auto">
                  Transforming businesses through innovative digital strategies
                  and data-driven insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes orbitPath1 {
          0% {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }

        @keyframes orbitPath2 {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(150px) rotate(360deg);
          }
        }

        @keyframes orbitPath3 {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @keyframes orbitPath4 {
          0% {
            transform: rotate(0deg) translateX(130px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(130px) rotate(360deg);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes slideLeft {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes noiseMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-10px, -10px);
          }
        }
      `}</style>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+94778500989?text=Hello%20DigiOra%20Media!%20I%27m%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-colors duration-300"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}
        aria-label="Chat on WhatsApp"
      >
        {/* Official WhatsApp Icon */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path
            d="M21.6 18.7c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.5.1-.2.1-.3.2-.5.1-.2 0-.4-.1-.6-.1-.2-.7-1.5-.9-2.1-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3 0 1.3.9 2.6 1.1 2.8.1.2 1.9 2.9 4.6 3.9.6.2 1.1.3 1.5.4.6.1 1.2.1 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.1-.2-.2-.5-.3z"
            fill="#fff"
          />
        </svg>
      </a>
    </>
  );
};

export default Header;
