const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')
const station = sequelize.define('station', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,

    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    }
})
module.exports = station;