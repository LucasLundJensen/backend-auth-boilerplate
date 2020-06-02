const Joi = require('@hapi/joi');

const UserCreateSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    email: Joi.string()
        .email()
        .required()
})

const UserLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})

module.exports = {
    UserCreateSchema,
    UserLoginSchema
};