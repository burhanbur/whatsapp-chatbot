'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatLog.init({
    sender: DataTypes.STRING,
    message: DataTypes.TEXT,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ChatLog',
  });
  return ChatLog;
};