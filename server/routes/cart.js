const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.get('/fetch_shopping_cart', cartController.fetchShoppingCart);

router.get('/fetch_products/:offset&:limit', cartController.fetchCartProducts);

router.post('/insert_product', cartController.insertProduct);

router.delete('/exclude_product/:id', cartController.excludeProduct);

module.exports = router;
