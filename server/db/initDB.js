const Session = require('../models/Session');
const User = require('../models/User');

module.exports = (force) => {
    User.sync(force);
    Session.sync(force);
};