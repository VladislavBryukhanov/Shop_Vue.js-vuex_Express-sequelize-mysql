const { Category } = require('../models');

module.exports.fetchCategories = async (request, response) => {
    try {
        const categories = await Category.findAndCountAll();
        response.send(categories);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

/*module.exports.fetchCategoriesPaginated = async (request, response) => {
    const offset = Number(request.params['offset']);
    const limit = Number(request.params['limit']);

    try {
        const categories = Category.findAndCountAll({
            offset,
            limit,
        });
        response.send(categories);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};*/
