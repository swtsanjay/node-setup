import expressLoader from './express';
import schedule from './schedule';
import { Logger } from '../utilities';
import { sequelize } from './sequelize';

import './lodash';

const loader = async function({ expressApp }) {
  await sequelize.authenticate();
  Logger.info('✌️ DB loaded and connected!');

  await schedule.init();
  Logger.info('✌️ Scheduler Running');

  await expressLoader.loadModules({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

module.exports = loader;
