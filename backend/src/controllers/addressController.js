const Address = require('../models/Address');

// @desc    Get all user addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single address by ID
// @route   GET /api/addresses/:id
// @access  Private
const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Verify address belongs to user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create new address
// @route   POST /api/addresses
// @access  Private
const createAddress = async (req, res) => {
  try {
    const { name, phone, address, city, state, postalCode, country, addressType, isDefault } = req.body;

    const newAddress = new Address({
      user: req.user._id,
      name,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      addressType,
      isDefault
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Verify address belongs to user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, phone, address: addressLine, city, state, postalCode, country, addressType, isDefault } = req.body;

    address.name = name || address.name;
    address.phone = phone || address.phone;
    address.address = addressLine || address.address;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;
    address.addressType = addressType || address.addressType;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    const updatedAddress = await address.save();
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Verify address belongs to user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Set default address
// @route   PUT /api/addresses/:id/default
// @access  Private
const setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Verify address belongs to user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Set this address as default (pre-save middleware will handle unsetting others)
    address.isDefault = true;
    const updatedAddress = await address.save();
    
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
