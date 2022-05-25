import { UserService } from '../../../services';
import { Response } from '../../../utilities';

export default class UserController {
  static async getAll(req, res) {
    try {
      const srvRes = await UserService.getAll(req.data);

      Response.success(res, srvRes);
    } catch (e) {
      Response.fail(res, e);
    }
  }
}
