const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration , validateLogin} = require('../middleware/authValidation');

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/profile',protect, getUserProfile);
router.post("/logout",logoutUser)

module.exports = router;