const UserService = require('../../../services/UserService');
const Response = require('../../../utilities/Response');

class UserController {
  static async getAll(req, res) {
    // try {
    //   const srvRes = await UserService.getAll(req.data);

    //   Response.success(res, srvRes);
    // } catch (e) {
    //   Response.fail(res, e);
    // }
  }
}

module.exports = UserController;