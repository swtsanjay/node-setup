const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs'), SALT_WORK_FACTOR = 10;
const config = require('../config');

const modelSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
}, { timestamps: true });

modelSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});


modelSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err){
            return cb(err);
        }
        cb(null, isMatch);
    });
};

modelSchema.methods.validateToken = async function (token, cb) {
    bcrypt.compare(candidatePassword, this.password, async function (err, isMatch) {

        const decode = jwt.verify(token, config.jwt.secretKey);
		req.userId = decode.sub;

		try {
			const cuser = await masterAdminModel.findById(decode.sub);

		} catch (e) {
			throw new Error('User does not exist')
		}


        if (err){
            return cb(err);
        }
        cb(null, isMatch);
    });
};


const masterAdminModel = model('masterAdmin', modelSchema);

module.exports = masterAdminModel;