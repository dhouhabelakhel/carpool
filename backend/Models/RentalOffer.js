const {DataTypes}= require('sequelize')
const sequelize=require('../config/dbConfig')
const rentalOffer=sequelize.define('rentalOffer',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      rental_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      vehicle_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
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
module.exports=rentalOffer;