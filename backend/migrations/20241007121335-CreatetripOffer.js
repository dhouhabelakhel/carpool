'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tripOffers', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      trip_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      startTime: {
        type: DataTypes.TIME
      },
      start_point:{
        type:DataTypes.STRING,
        allowNull:false
      },
      destination:{
        type:DataTypes.STRING,
        allowNull:false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      places: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isSmokingAllowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      start_point:{
        type:DataTypes.STRING,
        allowNull:false
      },
      destination:{
        type:DataTypes.STRING,
        allowNull:false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tripOffers');

  }
};
