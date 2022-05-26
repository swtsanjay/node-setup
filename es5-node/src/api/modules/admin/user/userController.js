const MasterService = require('../../../../services/MasterService');
const Response = require('../../../../utilities/Response');

class UserController {
	static async login(req, res) {
		try {
			const srvRes = await MasterService.login({userName: req.body.userName, password: req.body.password});
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}
	static async validateToken(req, res) {
		try {
			Response.success(res, {message: 'Validated', });
		} catch (e) {
			Response.fail(res, e);
		}
	}
}

module.exports = UserController;