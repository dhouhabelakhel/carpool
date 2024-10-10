'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('stations', { 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
name:{
  type:DataTypes.STRING,
  allowNull:false
},
location:{
  type:DataTypes.STRING,
  allowNull:false
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
    
      await queryInterface.dropTable('stations');
     
  }
};
