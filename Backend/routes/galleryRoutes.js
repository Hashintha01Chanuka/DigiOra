const express = require('express');
const router = express.Router();
const {
  upload,
  getAllGalleryImages,
  getGalleryImage,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  updateImageStatus,
  bulkUpdateImages,
  getGalleryStats
} = require('../controllers/GalleryController');

// Gallery CRUD routes
router.get('/', getAllGalleryImages);
router.get('/stats', getGalleryStats);
router.get('/:id', getGalleryImage);
router.post('/', upload.single('image'), createGalleryImage);
router.put('/:id', upload.single('image'), updateGalleryImage);
router.delete('/:id', deleteGalleryImage);
router.patch('/:id/status', updateImageStatus);
router.post('/bulk', bulkUpdateImages);

module.exports = router;
