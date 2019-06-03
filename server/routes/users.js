const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const roleController = require('../controllers/roles');
const pagingMiddleware = require('../middlewares/paging');

router.get('/fetch_role_list', roleController.fetchRoles);

router.get('/fetch_users', pagingMiddleware, userController.fetchUsers);

router.put('/update_role/:id', userController.updateRole);

module.exports = router;
