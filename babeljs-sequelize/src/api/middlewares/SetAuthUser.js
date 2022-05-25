import { Logger, Message, Response } from '../../utilities';

export default async (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const authorization = req.headers.authorization.trim();

			if (authorization.startsWith('Bearer ')) {
				const idToken = authorization.substring(7);
				if (idToken) {
					Logger.info('AuthMiddleware : Validating auth token');

					const authUser = await admin.auth().verifyIdToken(idToken);
					req.data.authUser = authUser;

				} else {
					Logger.error('AuthMiddleware : Empty token');

					throw Response.createError(Message.invalidToken);
				}
			} else {
				Logger.error('Invalid authorization value');

				throw Response.createError(Message.invalidToken);
			}
		}

		next();
	} catch (e) {
		Logger.error('AuthMiddleware Failed : ', e);

		const errRes = Response.createError(Message.tryAgain, e);
		Response.fail(res, errRes);
	}
};
