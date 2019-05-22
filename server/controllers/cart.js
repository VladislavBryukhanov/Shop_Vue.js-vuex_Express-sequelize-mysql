const sequelize = require('sequelize');
const User = require('../db/models/User');
const Cart = require('../db/models/Cart');
const Product = require('../db/models/Product');

module.exports.cartProductsCount = async (request, response) => {
    try {
        const count = await Cart.count({
            where: { UserId: request.user.id }
        });
        response.send({ count });
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.cartProductsTotalPrice = async (request, response) => {
    try {
        const products = await Cart.findAll({
            where: { UserId: request.user.id }
        });
        const ids = products.map(prod => prod.ProductId);

        const [ price ] = await Product.findAll({
            where: { id: ids },
            attributes: [[sequelize.fn('sum', sequelize.col('Products.price')), 'price']]
        });
        response.send(price);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

//Using for fetch all id and associate cart with store
module.exports.fetchAllCartProducts = async (request, response) => {
    try {
        const products = await Cart.findAndCountAll({
            where: { UserId: request.user.id }
        });
        response.send(products);
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
        const user = await User.findByPk(request.user.id);
        const cart = await user.getProducts({
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
        const user = await User.findByPk(request.user.id);
        const prod = await user.addProduct(ProductId);

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
    const ProductId = parseInt(request.params.id);

    try {
        const user = await User.findByPk(request.user.id);
        const prod = await user.removeProduct(ProductId);

        if (!prod) {
            response
                .status(400)
                .send('Such product already excluded from shopping cart');
        }

        response.sendStatus(200);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
