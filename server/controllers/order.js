const Order = require('../db/models/Order');
const OrderContent = require('../db/models/OrderContent');
const Product = require('../db/models/Product');
const Category = require('../db/models/Category');

module.exports.fetchOrders = async (request, response) => {
    const offset = Number(request.params['offset']);
    const limit = Number(request.params['limit']);

    try {
        const orders = await request.user.getOrders();
        console.error(orders);
        response.send(orders)
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
                model: OrderContent,
                include: [{
                    model: Product,
                    include: [{
                        model: Category,
                        attributes: ['name']
                    }]
                }],
                attributes: [
                    'ProductId',
                    // TODO WHY IT IS NOT WORKING???       NESTED AGGREGATION
                    // [sequelize.fn('COUNT', sequelize.col('Products.id')), 'totalCost'],
                    // [sequelize.fn('SUM', sequelize.col('OrderContents.Products.price')), 'totalCost'],
                ],
            }],
/*            attributes: [ 'id', 'createdAt',
                [sequelize.fn('COUNT', sequelize.col('OrderContents.id')), 'test'],
            ],
            group: [
                'Order.id',
                'OrderContents.id'
            ]*/
        });

        orders = orders.map(order => {
            const { id, createdAt, OrderContents } = order;
            const products = OrderContents.map(prod => prod.Product);
            return {
                id,
                createdAt,
                products
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

    const order = await Order.create();
    const orderContents = await OrderContent.bulkCreate(productQuery);

    request.user.addOrders(order);
    const res = await order.addOrderContents(orderContents);

    response.send(res);
};

module.exports.declineOrder = async (request, response) => {

};

//Можно намутить фичу с удаление через флаг делейтед + восстановлением заявки, если будет время
