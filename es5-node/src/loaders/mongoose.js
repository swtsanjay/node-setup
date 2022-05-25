const mongoose = require('mongoose');
const Logger = require('../utilities/Logger');
// const config = require('../config');

const databaseConnect = () => {
    const connectionString = `mongodb://localhost:27017/sme_world`;
    // const connectionString = `mongodb+srv://${ config.database.user}:${config.database.password}@cluster0.oiold.mongodb.net/${config.database.name}?retryWrites=${config.database.retryWrites}&w=majority`;
    console.log('connectionString', connectionString);
    mongoose.connect(connectionString);
    mongoose.connection.on('connected', function () {
        Logger.info("Database Connected");
    });
    mongoose.connection.on('error', function (err) {
        Logger.error(`
            Error while connecting database
            Error reason: ${err.message}
        `);
    });
    mongoose.connection.on('disconnected', function () {
        Logger.info("Database Disconnected");
    });
};
// console.log(mongoose.listCollections())

module.exports = databaseConnect;
