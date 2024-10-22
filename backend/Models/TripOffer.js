const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Gender: {
        type: DataTypes.ENUM('f', 'm'),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isSmoker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});


module.exports = User;
const tripOffer = sequelize.define('tripOffers', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    start_point:{
        type:DataTypes.STRING,
        allowNull:false
      },
      destination:{
        type:DataTypes.STRING,
        allowNull:false
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
});
User.hasMany(tripOffer, { foreignKey: 'user_id' });

tripOffer.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

module.exports = tripOffer;
