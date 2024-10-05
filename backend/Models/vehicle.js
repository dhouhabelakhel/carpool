const {DataTypes}=require('sequelize')
const sequelize=require('../config/dbConfig')
const vehicle=sequelize.define('vehicle',
    {
        id: {
            type :DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique:true
           },
           photo:{
            type:DataTypes.STRING,
            allowNull:false
           },
           description:{
            type:DataTypes.STRING,
            allowNull:false
           },
           model:{
            type:DataTypes.STRING,
            allowNull:false
           },
           seats:{
            type:DataTypes.INTEGER,
            allowNull:false
           },
           rent:{
            type:DataTypes.STRING,
            allowNull:false
           },
           user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
           },
           createdAt: {
            allowNull: false,
            type: DataTypes.DATE
           },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
           }
    }
)
module.exports=vehicle