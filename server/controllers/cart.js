const sequelize = require('sequelize');
const models = require('../models');

module.exports.fetchShoppingCart = async (request, response) => {
    try {
        const productsIds = await models.Cart.findAll({
            attributes: ['ProductId'],
            where: { UserId: request.user.id }
        }).then(res =>
            res.map(prod => prod.ProductId));

        const { totalCost } = await models.Product.findOne({
            where: { id: productsIds },
            attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalCost']],
            raw : true,
        });

        response.send({ productsIds, totalCost });
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.fetchCartProducts = async (request, response) => {
    const offset = Number(request.params['offset']);
    const limit = Number(request.params['limit']);

    try {
        const cart = await request.user.getProducts({
            offset,
            limit
        });

        response.send(cart);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.insertProduct = async (request, response) => {
    const ProductId = parseInt(request.body.productId);

    try {
        const prod = await request.user.addProduct(ProductId);

        if (!prod) {
            response
                .status(400)
                .send('Such product already inside shopping cart');
        }

        response.sendStatus(201);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.excludeProduct = async (request, response) => {
    const ProductId = parseInt(request.params['id']);

    try {
        const prod = await request.user.removeProduct(ProductId);

        if (!prod) {
            response
                .status(400)
                .send('Such product already excluded from shopping cart');
        }

        response.sendStatus(204);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
