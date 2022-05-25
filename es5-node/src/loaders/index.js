const expressLoader = require('./express');
const schedule = require('./schedule');
const Logger = require('../utilities/Logger');
const mongoose =  require('./mongoose');

require('./lodash');

const loader = async function ({ expressApp }) {
	await mongoose();
	Logger.info('✌️ DB loaded and connected!');

	await schedule.init();
	Logger.info('✌️ Scheduler Running');

	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');
};

module.exports = loader;