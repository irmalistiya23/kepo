'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('kepodb', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

sequelize.sync();

module.exports = User;
