"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {}
  Message.init(
    {
      from: DataTypes.STRING,
      subject: DataTypes.STRING,
      content: DataTypes.TEXT,
      read: DataTypes.BOOLEAN,
      archived: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Message",
    }
  )
  return Message
}
