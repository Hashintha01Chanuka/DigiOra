const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const connectDB = require('./config/database');

const defaultServices = [
  {
    title: "Digital Strategy",
    description: "Comprehensive digital marketing strategies tailored to your business objectives and market dynamics for sustainable growth.",
    icon: "Target",
    gradient: "from-red-500 to-red-600",
    order: 0,
    status: "active"
  },
  {
    title: "Social Media Marketing",
    description: "Engaging social media campaigns that build brand awareness and drive meaningful customer connections across all platforms.",
    icon: "Users",
    gradient: "from-red-400 to-red-500",
    order: 1,
    status: "active"
  },
  {
    title: "SEO & Analytics",
    description: "Advanced search engine optimization and data analytics to maximize your online visibility and deliver measurable ROI.",
    icon: "TrendingUp",
    gradient: "from-red-600 to-red-700",
    order: 2,
    status: "active"
  },
  {
    title: "Content Excellence",
    description: "High-quality content creation and marketing that resonates with your audience and drives meaningful engagement.",
    icon: "Award",
    gradient: "from-red-500 to-red-600",
    order: 3,
    status: "active"
  }
];

const seedServices = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');
    
    // Insert default services
    const insertedServices = await Service.insertMany(defaultServices);
    console.log(`Successfully seeded ${insertedServices.length} services`);
    
    // Display the seeded services
    insertedServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title} - ${service.status}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices(); 