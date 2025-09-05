const Service = require('../models/Service');

// Get all active services ordered by order field
const getAllServices = async (req, res) => {
  try {
    console.log('🔍 Fetching active services from database...');
    const services = await Service.find({ status: 'active' })
      .sort({ order: 1 })
      .select('-__v');

    console.log(`✅ Found ${services.length} active services:`, services.map(s => ({ id: s._id, title: s.title, status: s.status })));

    res.json({
      success: true,
      data: services,
      message: 'Services retrieved successfully'
    });
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// Get all services (admin use)
const getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ order: 1 })
      .select('-__v');

    res.json({
      success: true,
      data: services,
      message: 'All services retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching all services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching all services',
      error: error.message
    });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, icon, gradient, order } = req.body;

    // Validate required fields
    if (!title || !description || !icon || !gradient) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, icon, and gradient are required'
      });
    }

    // If order is not provided, set it to the next available order
    let serviceOrder = order;
    if (serviceOrder === undefined || serviceOrder === null) {
      const maxOrderService = await Service.findOne().sort({ order: -1 });
      serviceOrder = maxOrderService ? maxOrderService.order + 1 : 0;
    }

    const service = new Service({
      title,
      description,
      icon,
      gradient,
      order: serviceOrder
    });

    await service.save();

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log(`🔄 Updating service ${id} with data:`, updateData);

    // Remove _id and __v from update data if present
    delete updateData._id;
    delete updateData.__v;

    const service = await Service.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!service) {
      console.log(`❌ Service not found with id: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    console.log(`✅ Service updated successfully:`, { id: service._id, title: service.title, status: service.status });

    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('❌ Error updating service:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};

// Update service order
const updateServiceOrder = async (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        message: 'Services array is required'
      });
    }

    // Update each service's order
    const updatePromises = services.map((service, index) => {
      return Service.findByIdAndUpdate(
        service._id,
        { order: index },
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    // Fetch updated services
    const updatedServices = await Service.find()
      .sort({ order: 1 })
      .select('-__v');

    res.json({
      success: true,
      data: updatedServices,
      message: 'Service order updated successfully'
    });
  } catch (error) {
    console.error('Error updating service order:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service order',
      error: error.message
    });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id).select('-__v');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service,
      message: 'Service retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};

module.exports = {
  getAllServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
  updateServiceOrder,
  getServiceById
}; 