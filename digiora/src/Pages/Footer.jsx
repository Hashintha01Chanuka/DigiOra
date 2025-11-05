import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowRight, CheckCircle } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // 'success', 'error', or null
  const API_BASE_URL = import.meta.env.https://digi-ora-backend.vercel.app/ || "https://digi-ora-backend.vercel.app/";

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setSubscriptionStatus("error");
      setTimeout(() => setSubscriptionStatus(null), 5000);
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubscriptionStatus("success");
        setEmail("");
        setTimeout(() => setSubscriptionStatus(null), 8000);
      } else {
        setSubscriptionStatus("error");
        setTimeout(() => setSubscriptionStatus(null), 5000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscriptionStatus("error");
      setTimeout(() => setSubscriptionStatus(null), 5000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    { name: "Digital Strategy", path: "/services" },
    { name: "Social Media Marketing", path: "/services" },
    { name: "SEO & Analytics", path: "/services" },
    { name: "Content Excellence", path: "/services" },
    { name: "Brand Development", path: "/services" },
    { name: "Performance Marketing", path: "/services" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about" },
    { name: "Careers", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-2xl font-bold">
              DigiOra<span className="text-red-500">Media</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Delivering inspired digital marketing solutions to global brands
              through innovative strategies and cutting-edge technology.
            </p>
            <div className="flex items-center gap-9">
              <a
                href="mailto:hello@digioramedia.com"
                className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-300 cursor-pointer"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a
                href="tel:+15551234567"
                className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-300 cursor-pointer"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(service.path)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-full text-left"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-full text-left"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">Connect</h3>
            <div className="space-y-4 mb-6">
              <a
                href="mailto:hello@digioramedia.com"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 block"
              >
                digiora.contact@gmail.com
              </a>
              <a
                href="tel:+94778500989"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 block"
              >
                +94778500989
              </a>
              <div className="flex space-x-4">
                <a
                  href="https://youtube.com/@aharenna2975?si=epk3PAXDjsuf0RDz"
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                >
                  Youtube
                </a>
                <a
                  href="https://www.tiktok.com/@aharenna?_t=ZS-90sB0lMCpAw&_r=1"
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                >
                  Tiktok
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h4 className="text-white font-medium mb-3">Stay Updated</h4>

              {/* Success Message */}
              {subscriptionStatus === "success" && (
                <div className="mb-4 p-3 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    Thank you for subscribing! Check your email for
                    confirmation.
                  </span>
                </div>
              )}

              {/* Error Message */}
              {subscriptionStatus === "error" && (
                <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
                  Please enter a valid email address or try again later.
                </div>
              )}

              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubscribing}
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} DigiOra Media. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-1 text-gray-400 text-sm items-center">
              <span>Designed & Developed by</span>
              <a
                href="https://www.whyteq.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-500 transition-colors duration-300 font-medium"
              >
                WHYTEQ (Pvt) Ltd
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
