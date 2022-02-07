import express from "express";
import path from "path";
import 'dotenv/config';
import Config from './config';
import initLoader from './loaders';
import { Logger } from './utilities';

global.appRoot = path.resolve(__dirname);

Logger.init({ level: Config.logs.level });

process.on('uncaughtException', function (error) {
  Logger.error("Uncaught Exception : ")
  Logger.error(error);
});

(async () => {
  try {
    const app = express();

    await initLoader({ expressApp: app });

    app.listen(Config.port, err => {
      if (err) {
        Logger.error('', err);
        process.exit(1);
        return;
      }
      Logger.log(
        'info',
        `
      ################################################
      🛡️  Server listening on port: ${Config.port} 🛡️
      ################################################
    `,
      );
    });
  } catch (e) {
    // Deal with the fact the chain failed
    Logger.error('', e);
  }
})();
