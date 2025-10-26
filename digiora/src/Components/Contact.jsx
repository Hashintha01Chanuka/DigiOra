import React, { useEffect, useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar,
  CheckCircle, Star, Quote, ArrowRight, Globe, Linkedin,
  Twitter, Facebook, Instagram, Youtube, Users, Award,
  TrendingUp, Target, Headphones, Shield, Zap
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-animation').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.scroll-animation').forEach(el => observer.unobserve(el));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      budget: '',
      message: ''
    });
  };

  const handleContactAction = (action, method) => {
    switch (action) {
      case 'Send Email':
        window.open(`mailto:${method.primary}?subject=Inquiry from Website&body=Hello DigiOra Media,%0D%0A%0D%0AI am interested in your digital marketing services and would like to discuss my requirements.%0D%0A%0D%0AThank you.`, '_blank');
        break;
      case 'Call Now':
        window.open(`tel:${method.primary}`, '_self');
        break;
      case 'Start Chat':
        // WhatsApp chat link - replace with your actual WhatsApp number
        const whatsappNumber = '94778500989'; // Remove + and any spaces
        const message = 'Hello DigiOra Media! I am interested in your digital marketing services.';
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        break;
      default:
        break;
    }
  };

  const handleCTAAction = (action) => {
    switch (action) {
      case 'consultation':
        const whatsappNumber = '94778500989';
        const message = 'Hello DigiOra Media! I would like to schedule a free consultation for digital marketing services.';
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'call':
        window.open('tel:+94778500989', '_self');
        break;
      default:
        break;
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email for detailed inquiries",
      primary: "digiora.contact@gmail.com",
      action: "Send Email",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our Company team",
      primary: "+94778500989",
      action: "Call Now",
      gradient: "from-red-400 to-red-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      primary: "Available 24/7",
      action: "Start Chat",
      gradient: "from-red-500 to-red-600"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" }
  ];

  const services = [
    "Digital Strategy",
    "SEO & Analytics",
    "Social Media Marketing",
    "Content Creation",
    "Web Development",
    "PPC Advertising",
    "Email Marketing",
    "Other"
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
    "Let's Discuss"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "DigiOra Media's team is incredibly responsive and professional. They truly understand our business needs.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      company: "E-commerce Plus",
      text: "The consultation process was thorough and insightful. They provided clear roadmap for our digital transformation.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      company: "Local Business Co.",
      text: "From the first contact to project completion, the communication was exceptional throughout.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const whyChooseUs = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance whenever you need it"
    },
    {
      icon: Shield,
      title: "Trusted Partner",
      description: "Over 500+ successful projects and growing"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "We respond to all inquiries within 2 hours"
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Certified professionals with proven track record"
    }
  ];

  const faqs = [
    {
      question: "How quickly can we start working together?",
      answer: "We can typically begin within 1-2 weeks after our initial consultation, depending on the scope of your project."
    },
    {
      question: "Do you offer custom packages?",
      answer: "Absolutely! We create tailored solutions based on your specific needs, budget, and business objectives."
    },
    {
      question: "What's included in your consultation?",
      answer: "Our free consultation includes a comprehensive audit of your current digital presence, strategic recommendations, and a customized proposal."
    },
    {
      question: "How do you measure success?",
      answer: "We use data-driven metrics aligned with your business goals, including ROI, conversion rates, traffic growth, and engagement metrics."
    }
  ];

  return (
    <>
      <style jsx global>{`
        .scroll-animation { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.4,0,0.2,1);}
        .animate-in { opacity: 1; transform: translateY(0);}
        .delay-200 { transition-delay: 200ms;}
        .delay-400 { transition-delay: 400ms;}
        .delay-600 { transition-delay: 600ms;}
        .delay-800 { transition-delay: 800ms;}
        .delay-1000 { transition-delay: 1000ms;}
        .btn-hover { transition: all 0.3s ease; }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .gradient-text { background: linear-gradient(135deg, #dc2626, #b91c1c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .form-floating { position: relative; }
        .form-floating input:focus + label,
        .form-floating input:not(:placeholder-shown) + label,
        .form-floating textarea:focus + label,
        .form-floating textarea:not(:placeholder-shown) + label {
          transform: translateY(-1.5rem) scale(0.85);
          color: #dc2626;
        }
        .form-floating label {
          position: absolute;
          top: 1rem;
          left: 1rem;
          pointer-events: none;
          transition: all 0.2s ease;
          color: #6b7280;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animation">
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                Let's <span className="font-bold">Connect</span>
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">
                Ready to transform your digital presence? We're here to help you achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
              </div>
            </div>
            <div className="scroll-animation delay-400">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Call Us</div>
                      <a 
                        href="tel:+94778500989"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        +94778500989
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Email Us</div>
                      <a 
                        href="mailto:hello@digioramedia.com"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        digiora.contact@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-white/80">Mon-Fri: 9AM-6PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6 border border-red-100">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Choose Your Preferred <span className="gradient-text font-bold">Contact Method</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              We're available through multiple channels to ensure you can reach us in the way that's most convenient for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`scroll-animation delay-${index * 200} card-hover bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{method.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-800 font-medium hover:text-red-600 transition-colors cursor-pointer">
                    {method.primary}
                  </p>
                  <p className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer">
                    {method.secondary}
                  </p>
                </div>
                <button 
                  onClick={() => handleContactAction(method.action, method)}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors transform hover:scale-105 duration-200"
                >
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      {/* <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="scroll-animation">
              <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">Send us a message</h3>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                      />
                      <label>First Name</label> 
                    </div>
                    
                    <div className="form-floating">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                      />
                      <label>Last Name</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                      />
                      <label>Email Address</label>
                    </div>
                    
                    <div className="form-floating mt-0">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                      />
                      <label>Phone Number</label>
                    </div>
                  </div>

                  <div className="form-floating mt-5">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                    />
                    <label>Company Name</label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 mt-3">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 mt-3">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white hover:border-red-300"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-floating mt-5">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder=" "
                      rows="5"
                      required
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none bg-white hover:border-red-300"
                    ></textarea>
                    <label>Tell us about your project...</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-hover bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mt-5"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div> */}

            {/* Contact Info */}
            {/* <div className="scroll-animation delay-400">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Office Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                     
                      
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Office Hours</h4>
                        <div className="space-y-1">
                          {officeHours.map((hour, index) => (
                            <div key={index} className="flex justify-between text-gray-600">
                              <span>{hour.day}</span>
                              <span>{hour.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Us?</h3>
                  <div className="space-y-4">
                    {whyChooseUs.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://facebook.com/digioramedia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Facebook className="w-6 h-6 text-red-600" />
                    </a>
                    <a 
                      href="https://instagram.com/digioramedia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Instagram className="w-6 h-6 text-red-600" />
                    </a>
                    <a 
                      href="https://youtube.com/@digioramedia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Youtube className="w-6 h-6 text-red-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials 
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              What Our <span className="gradient-text font-bold">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients say about working with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="scroll-animation card-hover bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100" style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-red-600 mb-4" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-red-600 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Frequently Asked <span className="gradient-text font-bold">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services and process.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="scroll-animation card-hover bg-white p-6 rounded-2xl shadow-lg border border-gray-100" style={{ transitionDelay: `${index * 100}ms` }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-animation">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Ready to Start Your <span className="font-bold">Digital Journey?</span>
            </h2>
            <p className="text-xl font-light mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business and achieve your digital marketing goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleCTAAction('consultation')}
                className="btn-hover inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleCTAAction('call')}
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

export default ContactPage;