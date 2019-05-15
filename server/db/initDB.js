const User = require('./models/User');
const Session = require('./models/Session');
const Category = require('./models/Category');

const initDefaultValues = () => {
    Category.bulkCreate([
        { name: 'Tablet' },
        { name: 'Computers'},
        { name: 'Fruits' },
        { name: 'Vegetables' }
    ]);
};

module.exports = (force) => {
    User.sync(force);
    Session.sync(force);
    Category.sync(force);

    initDefaultValues();
};
