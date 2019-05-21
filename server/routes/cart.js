const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.get('/products_count', cartController.cartProductsCount);

router.get('/fetch_products/:offset&:limit', cartController.fetchCartProducts);

router.post('/insert_product', cartController.insertProduct);

router.delete('/exclude_product/:id', cartController.excludeProduct);

module.exports = router;
