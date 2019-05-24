const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/fetch_orders', orderController.fetchOrders);

router.get('/fetch_personal_orders', orderController.fetchPersonalOrders);

router.post('/create_personal_order', orderController.createPersonalOrder);

router.delete('/decline_order', orderController.declineOrder);