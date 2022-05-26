const { celebrate, Joi, Segments } = require('celebrate');

const validations = {
    login: celebrate({
        [Segments.BODY]: Joi.object().keys({
            userName: Joi.required().messages({
                'any.required': 'User name is required',
            }),
            password: Joi.required().messages({
                'any.required': 'Password is required',
            })
        }),
    })
};

module.exports = validations;