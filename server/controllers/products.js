const Product = require('../db/models/Product');
const Category = require('../db/models/Category');

module.exports.fetchProducts = async (request, response) => {
    const offset = Number(request.params['offset']);
    const limit = Number(request.params['limit']);

    try {
        const product = await Product.findAndCountAll({
            offset,
            limit,
            include: [
                { model: Category }
            ]
        });
        // product.getCategory();
        response.send(product);
    } catch (err) {
        response
            .status(500)
            .send(err.message)
    }
};

module.exports.addProduct = async (request, response) => {
    const { file } = request;
    if (file) {
        request.body.previewPhoto = file.filename;
    }

    try {
        const product = await Product.create(request.body);
        response.send(product);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
