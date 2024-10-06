'use strict';
const { DataTypes } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('rentalOffers', {
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
        references:{
          model:'vehicles',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'},
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

    await queryInterface.dropTable('rentalOffers');

  }
};
