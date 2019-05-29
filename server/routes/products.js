const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const productsController = require('../controllers/products');

const { fileQuotas } = require('../common/constants');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: fileQuotas.IMAGE_MAX_SIZE
    }
});

router.get('/categories', categoriesController.fetchCategories);

router.get('/categories/:offset&:limit', categoriesController.fetchCategoriesPaginated);

router.get('/products', productsController.fetchProducts);

router.post('/create_products', upload.single('attachedPhoto'), productsController.createProduct);

router.put('/update_product', upload.single('attachedPhoto'), productsController.updateProduct);

router.delete('/delete_product/:id', productsController.deleteProduct);

module.exports = router;
