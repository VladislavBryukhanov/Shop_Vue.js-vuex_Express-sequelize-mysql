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
                        attributes: [ 'name' ]
                    }]
                }],
            }],
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

    if (!productIds) {
        response
            .status(400)
            .send('Products is not exists');
    }

    try {
        const [ order, orderContents ] = await Promise.all([
            request.user.createOrder(),
            await OrderContent.bulkCreate(productQuery),
            request.user.removeProducts(productIds)
        ]);

        const res = await order.addOrderContents(orderContents);

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
