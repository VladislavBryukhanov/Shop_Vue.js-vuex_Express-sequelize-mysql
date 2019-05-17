const Product = require('../db/models/Product');
const Category = require('../db/models/Category');

module.exports.fetchProduct = async (request, response) => {
    try {
        const product = await Product.findAndCountAll({
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
