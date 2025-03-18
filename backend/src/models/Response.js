const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Response = sequelize.define('Response', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    keyword: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'responses',
    timestamps: false,
});

module.exports = Response;