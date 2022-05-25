const { celebrate, Joi } = require('celebrate');

const validations = {
    // login: celebrate({
    //     req: Joi.object().keys({
    //         email: Joi.string().required(),
    //         password: Joi.string().required(),
    //     }),
    // })
};

module.exports = validations;