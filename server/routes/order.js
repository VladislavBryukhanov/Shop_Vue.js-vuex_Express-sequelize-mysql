const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const pagingMiddleware = require('../middlewares/paging');

router.get('/fetch_orders', pagingMiddleware, orderController.fetchOrders);

router.get('/fetch_personal_orders', orderController.fetchPersonalOrders);

router.post('/create_personal_order', orderController.createPersonalOrder);

router.delete('/decline_order/:id', orderController.declineOrder);

module.exports = router;
