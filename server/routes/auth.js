const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMV = require('../middlewares/checkAuth');
const passport = require('../auth/passport');

router.post('/sign_up', async (request, response) => {
    try {
        const { body, logIn } = request;
        const user = await authController.signUp(body, logIn);

        response.send(user);
    } catch(err) {
        response.send(err);
    }
});

router.post('/sign_in', passport.authenticate('local'), async (request, response) => {
    try {
        response.send(request.user);
    } catch(err) {
        response.send(err);
    }
});

router.post('/sign_out', (request, response) => {
    request.logOut();
    response.send(200);
});

router.get('/me', authMV, (request, response) => {
    response.send(request.user);
});

module.exports = router;
