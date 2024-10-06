'use strict';

const {DataTypes}=require ('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('vehicles', { 
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
          references:{
            model:'users',
            key:'id'
          },
          onUpdate:'CASCADE',
          onDelete:'SET NULL'
         },
         createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

         },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

         }
      
      });
     
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('vehicles');
     
  }
};
