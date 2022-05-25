const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Logger = require('../utilities/Logger');
const Response = require('../utilities/Response');
const masterAdmin = require('../models/masterAdmin');
const config = require('../config');

const Message = null;

class MasterService {
    static async login({ userName, password }) {
        try {

            const response = {};

            const user = await masterAdmin.findOne({ userName });

            if(!user){
                throw new Error('User does not exist');
            }

            let isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new Error("Invalid Credentials");
            } else {
                const JWT_EXP_DUR = config.jwt.expDuration;
                const accessToken = jwt.sign({ sub: user._id.toString(), exp: Math.floor(Date.now() / 1000) + ((JWT_EXP_DUR) * 60), }, config.jwt.secretKey);

                response.message = "Loggedin successfully";
                response.data = { accessToken };
            }


            return response;

        } catch (e) {
            Logger.error('Logging Master Admin', e);
            throw Response.createError(e);
        }
    }


    static async getAll() {
        try {
            Logger.info('Getting users');

            const users = await masterAdmin.find({});

            return {
                data: users,
            };
        } catch (e) {
            Logger.error('Getting users', e);
            throw Response.createError(Message?.tryAgain, e);
        }
    }
}

module.exports = MasterService;