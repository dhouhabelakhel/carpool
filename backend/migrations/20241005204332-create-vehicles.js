'use strict';

const sequelize = require('../config/dbConfig');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('vehicles', { 
        id: {
          type :Sequelize.INTEGER,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique:true
         },
         photo:{
          type:Sequelize.STRING,
          allowNull:false
         },
         description:{
          type:Sequelize.STRING,
          allowNull:false
         },
         model:{
          type:Sequelize.STRING,
          allowNull:false
         },
         seats:{
          type:Sequelize.INTEGER,
          allowNull:false
         },
         rent:{
          type:Sequelize.BOOLEAN,
          allowNull:false
         },
         user_id:{
          type:Sequelize.INTEGER,
          references:{
            model:'users',
            key:'id'
          },
          onUpdate:'CASCADE',
          onDelete:'SET NULL'
         },
         createdAt: {
          allowNull: false,
          type: Sequelize.DATE
         },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
         }
      
      });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
