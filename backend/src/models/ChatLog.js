const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatLog = sequelize.define('ChatLog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sender: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    response: { type: DataTypes.TEXT }
}, { 
    tableName: 'chat_logs', 
    timestamps: false 
});

module.exports = ChatLog;