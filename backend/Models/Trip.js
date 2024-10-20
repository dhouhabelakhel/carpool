const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')
const trip = sequelize.define('trip', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      start_point:{
        type:DataTypes.STRING,
        allowNull:false
      },
      destination:{
        type:DataTypes.STRING,
        allowNull:false
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
module.exports = trip;