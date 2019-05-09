const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/sign_up', async (request, response) => {

    // const signIn = App.get('Services.Auth.signIn');

    try {
        const res = await authController.signUp(request.body);
        response.send(res);
    } catch(err) {
        console.error(err);
        response
            .status(400)
            .send(err);
    }
});

router.post('/sign_in', (req, res) => {

});

router.get('/me', (req, res) => {
    console.log('test')
    res.send({Ti:1})
});

module.exports = router;
