const { Project } = require("../models/index")
const handleImageUpload = require("../lib/imageUpload")

module.exports = class ProjectService {
  /**
   * Get all projects
   * @return {Promise} resolve to array of projects on success
   * @return {Promise} reject with boolean false on fail
   */
  static async getProjects() {
    try {
      await Project.sync()
      const projects = await Project.findAll({
        order: [
          ["id", "ASC"]
        ]
      })
      return projects
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Get a specific project
   * @param {Number} id - project PK
   * @return {Promise} resolve to project object on success
   * @return {Promise} boolean false on fail
   */
  static async getProject(id) {
    try {
      await Project.sync()
      const project = await Project.findByPk(id)
      return project
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Add a project to the database
   * Add a project image to static files
   * @param {Object} req - http request object
   */
  static async addProject(req) {
    try {
      const img_url = `https://michael-cook-portfolio-api.herokuapp.com/static/images/${req.body.imgFileName}`
      await Project.sync()
      const { title, description, repo_url, technologies, live_link } = req.body
      await Project.create({
        title,
        description,
        img_url,
        repo_url,
        technologies,
        live_link,
      })
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Update a post
   * @param {Numner} id - project PK
   * @param {Object} payload - request body\
   * @return {Promise} resolve to true on success
   * @return {Promise} reject with false on fail
   */
  static async updateProject(id, payload) {
    try {
      await Project.sync()
      const project = Project.findByPk(id)
      for (let name in payload) {
        project[name] = payload[name]
        await project.save()
      }
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Delete a project
   * @param {Number} id - project PK
   */
  static async deleteProject(id) {
    try {
      await Project.sync()
      const project = await Project.findByPk(id)
      await project.destroy()
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
