const projectService = require("../services/ProjectService")

module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const project = await projectService.getProject(id)
    if (!project) {
      return res.status(404).end()
    }
    // on a simple GET request the controller can pass along
    // the project instead of making another database query
    req.project = project
    return next()
  }
}
