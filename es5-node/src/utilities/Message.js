const HttpStatus = require('http-status-codes');

module.exports = {
	invalidToken: {
		name: 'Authorization error',
		message: 'Invalid token',
		code: HttpStatus.StatusCodes.UNAUTHORIZED
	},
	
}