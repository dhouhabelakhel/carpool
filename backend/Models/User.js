const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
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
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Gender: {
        type: DataTypes.ENUM('f', 'm'),
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isSmoker: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    modelName: 'User'
});

module.exports = User;
