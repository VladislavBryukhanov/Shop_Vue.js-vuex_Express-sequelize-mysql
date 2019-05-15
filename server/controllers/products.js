const Product = require('../db/models/Product');

module.exports.fetchProduct = async (request, response) => {
    try {
        const product = await Product.findAndCountAll({
            include: [
                { model: 'Categories' }
            ]
        });
        response.send(product);
    } catch (err) {
        response
            .status(500)
            .send(err)
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
            .send(err);
    }
};
