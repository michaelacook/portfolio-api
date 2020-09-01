const ProjectService = require("../services/ProjectService")

module.exports = class ProjectController {
  /**
   * Handle control for /projects GET
   * @param {Object} req - http request object
   * @param {Object} res - http response object
   * @param {Function} next - next middleware function
   */
  static async projectsGET(req, res, next) {
    try {
      const projects = await ProjectService.getProjects()
      return res.json(projects)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /projects/:id GET
   * @param {Object} req 
   * @param {Object} res 
   * @param {Function} next 
   */
  static async projectGET(req, res, next) {
    try {
      const id = req.params.id 
      const project = await ProjectService.getProject(id)
      return res.json(project)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /projects/add POST
   * @param {Object} req 
   * @param {Object} res 
   * @param {Function} next 
   */
  static async projectPOST(req, res, next) {
    try {
      await ProjectService.addProject(req)
      return res.status(201).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /projects/:id/update PUT
   * @param {Object} req 
   * @param {Object} res 
   * @param {Function} next 
   */
  static async projectPUT(req, res, next) {
    try {
      const id = req.params.id 
      await ProjectService.updateProject(id, req.body)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /projects/:id/delete DELETE
   * @param {Object} req 
   * @param {Object} res 
   * @param {Object} next 
   */
  static async projectDELETE(req, res, next) {
    try {
      const id = req.params.id 
      await ProjectService.deleteProject(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
