const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMV = require('../middlewares/AuthMV');
// const passport = require('passport');
const passport = require('../auth/passport');

router.post('/sign_up', async (request, response) => {
    try {
        const user = await authController.signUp(request);
        request.logIn(user, (err) => {
           if (err) {
               throw err;
           }
            response.send(user);
        });
    } catch(err) {
        response.send(err);
    }
});

router.post('/sign_in', passport.authenticate('local'), async (request, response) => {
    try {
        const res = await authController.signIn(request);
        response.send(res);
    } catch(err) {
        response.send(err);
    }
});

router.get('/me', authMV, (request, response) => {
    response.send(request.user);
});

router.post('/sign_out', (request, response) => {
    request.logOut();
    response.send(200);
});

module.exports = router;
