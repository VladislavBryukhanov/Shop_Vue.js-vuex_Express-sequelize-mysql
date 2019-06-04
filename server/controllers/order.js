const _ = require('lodash');
const { Order, OrderProduct, Product, Category, User, ContactInfo } = require('../models');

module.exports.fetchOrders = async (request, response) => {
    try {
        const orders = await Order.findAndCountAll({
            ...request.paging,
            include: [{
                model: OrderProduct,
                include: [{
                    model: Product,
                    include: [{
                        model: Category,
                        attributes: [ 'name' ]
                    }]
                }],
            }],
        });

        const resultOrders = [];
        const populateUserContactInfo = [];

        orders.rows.map(order => {
            const promise = User.findOne({
                where: { id: order.UserId },
                include: [{
                    model: ContactInfo
                }]
            }).then(user => {
                const { ContactInfo } = user;
                const { id, createdAt, OrderProducts } = order;
                const products = OrderProducts.map(prod => prod.Product);

                resultOrders.push({
                    id,
                    createdAt,
                    ContactInfo,
                    products
                });
            });

            populateUserContactInfo.push(promise);
        });
        await Promise.all(populateUserContactInfo);

        response.send({ rows: resultOrders, count: orders.count });
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.fetchPersonalOrders = async (request, response) => {
    // TODO paginate
    try {
        let orders = await request.user.getOrders({
            include: [{
                model: OrderProduct,
                include: [{
                    model: Product,
                    include: [{
                        model: Category,
                        attributes: [ 'name' ]
                    }]
                }],
            }],
        });

        orders = orders.map(order => {
            const { id, createdAt, OrderProducts } = order;
            const products = OrderProducts.map(prod => prod.Product);
            return {
                id,
                createdAt,
                products: _.compact(products)
            }
        });

        response.send(orders);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.createPersonalOrder = async (request, response) => {
    const { productIds } = request.body;
    const productQuery = productIds.map(id => ({ ProductId: id }));

    if (!productIds) {
        response
            .status(400)
            .send('Products is not exists');
    }

    try {
        const [ order, OrderProducts ] = await Promise.all([
            request.user.createOrder(),
            OrderProduct.bulkCreate(productQuery),
            request.user.removeProducts(productIds)
        ]);

        const res = await order.addOrderProduct(OrderProducts);

        response.send(res);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.declineOrder = async (request, response) => {
    const id = request.params['id'];

    try {
        const ord = await Order.destroy({where: { id }});

        if (!ord) {
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

//Можно намутить фичу с удаление через флаг делейтед + восстановлением заявки, если будет время
