const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const checkAuth = require('../middlewares/checkAuth');

router.post('/sign_up', authController.signUp);

router.post('/sign_in', authController.signIn);

router.post('/sign_out', (request, response) => {
    request.logOut();
    response.sendStatus(200);
});

router.get('/me', checkAuth, (request, response) => {
    response.send(request.user);
});

module.exports = router;
