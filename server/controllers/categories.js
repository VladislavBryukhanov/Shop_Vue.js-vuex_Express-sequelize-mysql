const { Category } = require('../models');

module.exports.fetchCategories = async (request, response) => {
    try {
        const categories = await Category.findAll();
        response.send(categories);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.createCategory = async (request, response) => {
    const { categoryName } = request.body;

    try {
        const category = await Category.create({ name: categoryName });
        response.send(category);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.removeCategory = async (request, response) => {
    const { id } = request.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return response
                .status(404)
                .send('Such category not found');
        }

        await category.destroy();
        response.sendStatus(204);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
