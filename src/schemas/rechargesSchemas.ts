import joi from 'joi';

export const newRechargeSchema = joi.object({
    cardId: joi.number().integer().required(),
    amount: joi.number().integer().required()
});