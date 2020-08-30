"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      img_url: DataTypes.STRING,
      repo_url: DataTypes.STRING,
      technologies: DataTypes.JSON,
      live_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  )
  return Project
}
