const express = require('express');
const path = require('path');
require('dotenv/config');
const config = require('./config');
const initLoader = require('./loaders');
const Logger = require('./utilities/Logger');

global.appRoot = path.resolve(__dirname);


Logger.init({ level: config.logs.level });

process.on('uncaughtException', function (error) {
	Logger.error("Uncaught Exception : ");
	Logger.error(error);
});

(async () => {
	try {
		const app = express();
		await initLoader({ expressApp: app });
		app.listen(config.port, err => {
			if (err) {
				Logger.error('', err);
				process.exit(1);
				return;
			}
			Logger.log(
				'info',
				`
					################################################
					🛡️  Server listening on port: ${config.port} 🛡️
					################################################
				`,
			);

		});
	} catch (e) {
		// Deal with the fact the chain failed
		Logger.error('', e);
	}
})();

