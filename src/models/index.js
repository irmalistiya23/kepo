const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('kepodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

const Reminder = sequelize.define('Reminder', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    reminder_type: { type: DataTypes.ENUM('bill', 'savings'), allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    due_date: { type: DataTypes.DATE, allowNull: false }
});

// Define relationships
User.hasMany(Transaction, { foreignKey: 'user_id' });
User.hasMany(Reminder, { foreignKey: 'user_id' });
Category.hasMany(Transaction, { foreignKey: 'category_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = {
    sequelize,
    User,
    Category,
    Transaction,
    Reminder
}; 