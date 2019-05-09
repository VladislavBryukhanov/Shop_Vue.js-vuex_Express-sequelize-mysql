const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMV = require('../middlewares/AuthMV');
// const passport = require('passport');
const passport = require('../auth/passport');

router.post('/sign_up', authMV, async (request, response) => {
    try {
        const res = await authController.signUp(request);
        response.send(res);
    } catch(err) {
        response.send(err);
    }
});

router.post('/sign_in', passport.authenticate('local'), async (request, response) => {
    try {
        const res = await authController.signIn(request);
        console.error(request.sessionID);
        console.error(response.sessionID);
        // console.error(request.isAuthenticated());
        response.send(res);
    } catch(err) {
        response.send(err);
    }
});

router.get('/me', authMV, (req, res) => {
    console.log('test')
    req.logout();
    res.send({Ti:1})
});

module.exports = router;
