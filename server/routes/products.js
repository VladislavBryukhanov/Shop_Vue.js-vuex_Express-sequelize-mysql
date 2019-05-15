const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const productsCotroller = require('../controllers/products');

router.get('/categories', categoriesController.fetchCategories);

router.get('/categories/:offset&:limit', categoriesController.fetchCategoriesPaginated);

router.post('/addProduct', productsCotroller.addProduct);

module.exports = router;
