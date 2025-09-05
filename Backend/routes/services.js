const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
  updateServiceOrder,
  getServiceById
} = require('../controllers/serviceController');

// Public routes (for frontend)
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Admin routes
router.get('/admin/all', getAllServicesAdmin);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.put('/admin/order', updateServiceOrder);

module.exports = router; 