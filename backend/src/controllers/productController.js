const Product = require('../models/Product');

const { deleteImage, uploadImage } = require('../utils/uploadImage'); // add this import

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {

  try {
    
    const {name,description, price, category, rating, numReviews, countInStock} = req.body

    if(!name || !description || !price || !category){
       return res.status(400).json({message:"Name, description, price and category are required.", success:false})
    }

    let thumbnailUrl;
    if(req.file){
        thumbnailUrl = await uploadImage(req.file);
        if(!thumbnailUrl){
          return res.status(400).json({message:"Error in uploading image.", success:false})
        }
    }else{
      return res.status(400).json({message:"Please upload product thumbnail.",success:false})
    }

    const product = new Product({
      name,
      price,
      category,
      description,
      rating,
      numReviews,
      countInStock,
      thumbnail:thumbnailUrl,
      user:req.user._id
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log("error:",error.message)
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.thumbnail = req.body.thumbnail || product.thumbnail;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // Delete thumbnail image if exists
      if (product.thumbnail) {
        try {
          await deleteImage(product.thumbnail);
        } catch (err) {
          console.log('Error deleting thumbnail:', err.message);
        }
      }
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
