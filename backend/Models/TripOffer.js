const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');  // Assurez-vous que le modèle User est correctement importé

class TripOffer extends Model {}

TripOffer.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    start_point: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    trip_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    places: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isSmokingAllowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'TripOffer'
});

// Associations
TripOffer.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

module.exports = TripOffer;
