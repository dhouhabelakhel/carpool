const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const TripOffer = require('./TripOffer');  // Assurez-vous que le modèle TripOffer est correctement importé

class Reservation extends Model {}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reservation_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trip_offer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TripOffers',  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  
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
    modelName: 'Reservation'
});

Reservation.belongsTo(TripOffer, { as: 'offer', foreignKey: 'trip_offer' });


module.exports = Reservation;
