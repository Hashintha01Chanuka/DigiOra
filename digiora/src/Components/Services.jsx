import React, { useEffect, useState } from "react";

import {
  Target,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowRight,
  Search,
  BarChart,
  Globe,
  Smartphone,
  PenTool,
  Video,
  Mail,
  Monitor,
  Settings,
  Zap,
  Eye,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Quote,
  Play,
  Phone,
} from "lucide-react";

const iconMap = {
  Target,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Search,
  BarChart,
  Globe,
  Smartphone,
  PenTool,
  Video,
  Mail,
  Monitor,
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
};

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [services, setServices] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.https://digi-ora-backend.vercel.app || "https://digi-ora-backend.vercel.app";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        const data = await response.json();
        if (data.success && data.data) {
          setFetchedServices(data.data);
          // Take the first 4 services for main services section
          setServices(data.data.slice(0, 4));
        } else {
          setServices([]);
          setFetchedServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
        setFetchedServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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

  const mainServices = [
    {
      icon: Target,
      title: "Digital Strategy",
      description:
        "Comprehensive digital marketing strategies tailored to your business objectives and market dynamics for sustainable growth.",
      gradient: "from-red-500 to-red-600",
      features: [
        "Market Analysis",
        "Competitor Research",
        "Strategic Planning",
        "ROI Optimization",
      ],
    },
    {
      icon: Users,
      title: "Social Media Marketing",
      description:
        "Engaging social media campaigns that build brand awareness and drive meaningful customer connections across all platforms.",
      gradient: "from-red-400 to-red-500",
      features: [
        "Content Creation",
        "Community Management",
        "Paid Advertising",
        "Analytics",
      ],
    },
    {
      icon: TrendingUp,
      title: "SEO & Analytics",
      description:
        "Advanced search engine optimization and data analytics to maximize your online visibility and deliver measurable ROI.",
      gradient: "from-red-600 to-red-700",
      features: [
        "Technical SEO",
        "Content Optimization",
        "Performance Tracking",
        "Reporting",
      ],
    },
    {
      icon: Award,
      title: "Content Excellence",
      description:
        "High-quality content creation and marketing that resonates with your audience and drives meaningful engagement.",
      gradient: "from-red-500 to-red-600",
      features: [
        "Blog Writing",
        "Video Production",
        "Graphic Design",
        "Content Strategy",
      ],
    },
  ];

  const allServices = [
    {
      icon: Search,
      title: "Search Engine Optimization",
      description:
        "Boost your organic visibility and drive qualified traffic to your website.",
    },
    {
      icon: BarChart,
      title: "Pay-Per-Click Advertising",
      description:
        "Maximize ROI with targeted PPC campaigns across Google, Bing, and social platforms.",
    },
    {
      icon: Globe,
      title: "Web Design & Development",
      description:
        "Create stunning, responsive websites that convert visitors into customers.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Marketing",
      description:
        "Comprehensive marketing strategies for mobile applications and app stores.",
    },
    {
      icon: PenTool,
      title: "Brand Identity Design",
      description:
        "Develop compelling brand identities that resonate with your target audience.",
    },
    {
      icon: Video,
      title: "Video Marketing",
      description:
        "Engaging video content that tells your story and drives conversions.",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description:
        "Nurture leads and retain customers with personalized email campaigns.",
    },
    {
      icon: Monitor,
      title: "Conversion Rate Optimization",
      description:
        "Optimize your website and landing pages for maximum conversion rates.",
    },
    {
      icon: Settings,
      title: "Marketing Automation",
      description:
        "Streamline your marketing processes with intelligent automation tools.",
    },
  ];

  const processes = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We analyze your business, market, and goals to create a tailored strategy.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "Develop comprehensive marketing plans aligned with your objectives.",
    },
    {
      step: "03",
      title: "Implementation",
      description: "Execute campaigns with precision and attention to detail.",
    },
    {
      step: "04",
      title: "Optimization",
      description: "Continuously monitor and refine for maximum performance.",
    },
    {
      step: "05",
      title: "Reporting",
      description: "Provide transparent insights and measurable results.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "DigiOra Media transformed our digital presence. Our organic traffic increased by 300% in just 6 months.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "E-commerce Plus",
      text: "The social media campaigns delivered exceptional results. Our engagement rates doubled across all platforms.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      company: "Local Business Co.",
      text: "Professional service and outstanding results. They truly understand our business needs.",
      rating: 5,
    },
  ];

  const packages = [
    {
      name: "Starter",
      price: "Rs.2,999",
      period: "/month",
      features: [
        "SEO Optimization",
        "Social Media Management",
        "Monthly Reporting",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "Rs.5,999",
      period: "/month",
      features: [
        "Everything in Starter",
        "PPC Advertising",
        "Content Creation",
        "Weekly Reporting",
        "Phone Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Rs.9,999",
      period: "/month",
      features: [
        "Everything in Professional",
        "Custom Strategy",
        "Dedicated Account Manager",
        "24/7 Support",
        "Advanced Analytics",
      ],
      popular: false,
    },
  ];

  const handleCTAAction = (action) => {
    switch (action) {
      case "consultation":
        const whatsappNumber = "94778500989";
        const message =
          "Hello DigiOra Media! I would like to get a free consultation for your digital marketing services.";
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
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tab-active {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animation">
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                Our <span className="font-bold">Services</span>
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">
                Comprehensive digital marketing solutions designed to drive
                growth and maximize your ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4"></div>
            </div>
            <div className="scroll-animation delay-400">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">What We Offer</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Digital Strategy</div>
                      <div className="text-white/80">
                        Tailored marketing plans
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">SEO & Analytics</div>
                      <div className="text-white/80">
                        Data-driven optimization
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Social Media</div>
                      <div className="text-white/80">Engaging campaigns</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6 border border-red-100">
              Core Services
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              We Offer The Best Of{" "}
              <span className="gradient-text font-bold">Every World</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              In a complex digital landscape that doesn't stop evolving, we
              champion agility by partnering with the best technologies and
              strategies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Target;
              return (
                <div
                  key={service._id || index}
                  className={`group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-red-200 flex flex-col h-full`}
                >
                  <div className="flex-grow">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Our <span className="gradient-text font-bold">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that delivers consistent results for our
              clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processes.map((process, index) => (
              <div
                key={index}
                className="scroll-animation text-center"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials 
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Client <span className="gradient-text font-bold">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. See what our clients say about our services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="scroll-animation card-hover bg-white p-8 rounded-2xl shadow-lg" style={{transitionDelay: `${index * 200}ms`}}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-red-600 text-sm">{testimonial.company}</div>
                </div>
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
              Ready to <span className="font-bold">Get Started?</span>
            </h2>
            <p className="text-xl font-light mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can transform your digital presence
              and drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleCTAAction("consultation")}
                className="btn-hover inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                Get Free Consultation
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
    </>
  );
};

export default ServicesPage;
