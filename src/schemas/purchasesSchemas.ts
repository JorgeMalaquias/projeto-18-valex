import joi from 'joi';

export const newShoppingSchema = joi.object({
    cardId: joi.number().integer().required(),
    businessId: joi.number().integer().required(),
    amount: joi.number().integer().required(),
    password: joi.string().length(4).pattern(/^[0-9]{4}$/).required()
});