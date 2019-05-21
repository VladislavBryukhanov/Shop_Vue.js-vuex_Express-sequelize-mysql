const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.get('/shopping_cart', cartController.fetchCart);

module.exports = router;
