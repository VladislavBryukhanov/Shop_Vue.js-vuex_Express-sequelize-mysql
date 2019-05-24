const User = require('../db/models/User');
const Order = require('../db/models/Order');
const OrderContent = require('../db/models/OrderContent');

module.exports.fetchOrders = async (request, response) => {

};

module.exports.fetchPersonalOrders = async (request, response) => {

};

module.exports.createPersonalOrder = async (request, response) => {
    const { productIds } = request.body;
    const productQuery = productIds.map(id => ({ ProductId: id }));

    const user = await User.findByPk(request.user.id);
    const order = await Order.create();
    const orderContents = await OrderContent.bulkCreate(productQuery);

    user.addOrders(order);
    const res = await order.addOrderContents(orderContents);

    response.send(res);
};

module.exports.declineOrder = async (request, response) => {

};

//Можно намутить фичу с удаление через флаг делейтед + восстановлением заявки, если будет время
