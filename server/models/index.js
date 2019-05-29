'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// FIXME just for initilize db for first running
const initDefaultValues = (db) => {
  // db.sequelize.sync();
  db.Session.sync();
  db.Role.sync();
  db.ContactInfo.sync();
  db.User.sync();
  db.Product.sync();
  db.Category.sync();
  db.Cart.sync();
  db.Order.sync();
  db.OrderContent.sync();
  db.Message.sync();
  db.Chat.sync();

  db.Category.bulkCreate([
    { name: 'Art' },
    { name: 'Fruits' },
    { name: 'Tablet' },
    { name: 'Clothes' },
    { name: 'Business' },
    { name: 'Fastfood' },
    { name: 'Computers' },
    { name: 'Vegetables' },
    { name: 'Smartphones' },
    { name: 'Decorations' }
  ]);

  db.Role.bulkCreate([
    { name: 'User' },
    { name: 'Admin' },
    { name: 'Manager' }
  ]);
};
// initDefaultValues(db);

module.exports = db;
