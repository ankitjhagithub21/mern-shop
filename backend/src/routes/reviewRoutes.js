const express = require('express');
const {
  createReview,
  getReviews,
  getProductReviews,
  getUserReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getTopReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.route('/').get(getReviews).post(protect, createReview);
router.route('/top').get(getTopReviews);
router.route('/product/:id').get(getProductReviews);

// Protected routes
router.route('/user').get(protect, getUserReviews);
router
  .route('/:id')
  .get(getReviewById)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
