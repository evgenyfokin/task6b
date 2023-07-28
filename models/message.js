'use strict';
const {Model} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
    }
  }
  Message.init({
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};