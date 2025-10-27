const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { admin, protect } = require('../middleware/authMiddleware');
const upload = require("../config/multer")

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect,admin,upload.single('thumbnail'),createProduct);
router.put('/:id',protect,admin, updateProduct);
router.delete('/:id',protect,admin, deleteProduct);

module.exports = router;