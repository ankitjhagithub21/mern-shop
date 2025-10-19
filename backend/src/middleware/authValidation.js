const { body, validationResult } = require('express-validator');

// Reusable middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }
  next();
};

// Validation for user registration
const validateRegistration = [
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }) // Example minimum length
    .withMessage('Password must be at least 6 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Password confirmation is required.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password and Confirmation Password do not match.');
      }
      return true;
    }),
  handleValidationErrors, // Add the error handler middleware
];

// Validation for user login
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
  handleValidationErrors,
];

module.exports = {
  validateRegistration,
  validateLogin,
};
