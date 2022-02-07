import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import Config from "../config";

const basename = path.basename(__filename);
const Models = {};

const modelsPath = `${__dirname}/../models`;

const sequelize = new Sequelize(Config.database.name, Config.database.user, Config.database.password, {
  host: Config.database.host,
  dialect: Config.database.dialect,
});

fs.readdirSync(modelsPath)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    
    let model_file = require(`${path.join(modelsPath, file)}`)
    let model = model_file.default;
    Models[model.name] = model.init(sequelize);
  });

Object.keys(Models).forEach(modelName => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models);
  }
});

export {
  sequelize,
  Models,
};
