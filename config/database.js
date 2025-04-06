const Sequelize = require('sequelize');

const sequelize = new Sequelize('kepodb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize; 