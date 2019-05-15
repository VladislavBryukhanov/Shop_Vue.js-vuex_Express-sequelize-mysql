const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

router.get('/categories', categoriesController.fetchCategories);

router.get('/categories/:offset&:limit', categoriesController.fetchCategoriesPaginated);

module.exports = router;
