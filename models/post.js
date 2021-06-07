"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      tags: DataTypes.JSON,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  )
  return Post
}
