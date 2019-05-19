const Product = require('../db/models/Product');
const Category = require('../db/models/Category');
const fs = require('fs');
const path = require('path');

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

module.exports.createProduct = async (request, response) => {
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

module.exports.deleteProduct = async (request, response) => {
    const id = request.params['id'];
    try {
        const product = await Product.findByPk(id);
        const { previewPhoto } = product;

        if (previewPhoto) {
            const filePath = path.join( __dirname, `/../public/preview_photo/${previewPhoto}`);
            fs.unlink(filePath,
                (err) => err && console.error(err));
        }

        await Product.destroy({ where: { id }});
        response.sendStatus(200);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};