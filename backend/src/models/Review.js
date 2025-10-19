const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'flagged', 'removed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Index for better query performance
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });

// Virtual for formatted date
reviewSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString();
});

// Method to check if review is helpful
reviewSchema.methods.isHelpful = function () {
  return this.helpfulVotes > 5;
};

// Static method to get average rating for a product
reviewSchema.statics.getAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId, status: 'active' } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return result.length > 0 ? result[0] : { averageRating: 0, totalReviews: 0 };
};

// Pre-save middleware to validate verified purchase
reviewSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Check if user has purchased this product (you can implement this logic)
    // For now, we'll set it based on some condition
    // this.isVerifiedPurchase = await checkPurchaseHistory(this.user, this.product);
  }
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
