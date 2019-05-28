const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

//TODO paging middleware with query parsing
router.get('/fetch_orders/:offset&:limit', orderController.fetchOrders);

router.get('/fetch_personal_orders/:offset&:limit', orderController.fetchPersonalOrders);

router.post('/create_personal_order', orderController.createPersonalOrder);

router.delete('/decline_order/:id', orderController.declineOrder);

module.exports = router;
