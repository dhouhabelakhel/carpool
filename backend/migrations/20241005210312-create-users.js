'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      'id': {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      'name': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'first_name': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'username': {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      'email': {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      'password': {
        type: DataTypes.STRING,
        allowNull: false,

      },
      'photo': {
        type: DataTypes.STRING,
        allowNull: false,
      },
      'birthdate': {
        type: DataTypes.DATE,
        allowNull: false
      },
      'phone_number': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'city': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'isSmoker': {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false

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
    await queryInterface.dropTable('users');

  }
};
