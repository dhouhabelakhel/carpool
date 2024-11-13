// models/Admin.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

class Admin extends Model {}

Admin.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'admin'
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Admin'
});

module.exports = Admin;
