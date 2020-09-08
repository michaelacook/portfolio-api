const UserService = require("../services/UserService")

module.exports = class UserController {
  /**
   * Handle control for /user GET
   * @param {Object} req - http request
   * @param {Object} res - http response
   * @param {Function} next - next middleware in chain
   */
  static async userGET(req, res, next) {
    try {
      const email = req.user.email
      const user = await UserService.getUser(email)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
}
