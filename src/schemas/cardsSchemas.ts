import joi from 'joi';


export const newCardSchema = joi.object({
    employeeId:joi.number().integer().required(),
    type:joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
});


export const cardActivationSchema = joi.object({
    id: joi.number().integer().required(),
    securityCode: joi.string().length(3).required(),
    password: joi.string().length(4).pattern(/^[0-9]{4}$/).required()
});

export const cardBlockingSchema = joi.object({
    id: joi.number().integer().required(),
    password: joi.string().length(4).pattern(/^[0-9]{4}$/).required()
});