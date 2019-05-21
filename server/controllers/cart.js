const User = require('../db/models/User');

module.exports.cartProductsCount = async (request, response) => {
    try {
        const count = User.count({
            where: { UserId: request.user.id }
        });
        response.send(count);
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
        await user.addProduct(ProductId);
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
        await user.removeProduct(ProductId);
        response.sendStatus(200);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
