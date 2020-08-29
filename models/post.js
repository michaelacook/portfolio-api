"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      tags: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Post",
    }
  )
  return Post
}
