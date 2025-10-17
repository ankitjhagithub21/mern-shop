const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require('../controllers/addressController');

router.route('/')
  .get(protect, getAddresses)
  .post(protect, createAddress);

router.route('/:id')
  .get(protect, getAddressById)
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

router.put('/:id/default', protect, setDefaultAddress);

module.exports = router;
