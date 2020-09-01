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
      const projects = await Project.findAll()
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
   * @param {Object} payload - http request object
   */
  static async addProject(payload) {
    try {
     // video tut on file uploads: https://www.youtube.com/watch?v=ymO_r1hcIXk
     let img_url = null
     await Project.sync()
     if (req.files) {
      img_url = `http://localhost:3000/static/images/${req.files.img.name}`
      handleImageUpload(req.files, 'img')
     }
     await Project.create({
      title,
      description,
      img_url,
      repo_url,
      technologies, 
      live_link
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
