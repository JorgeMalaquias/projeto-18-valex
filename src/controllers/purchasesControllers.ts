import { Request, Response } from "express";
import { buying, checkingPassword, validatingPurchase, verifyingBusiness, verifyingIfTheCardExists, verifyingIfTheCardExpiration, verifyingIfTheCardIsActivated, verifyingIfTheCardIsBlocked, verifyingType } from "../services/purchasesServices";

export async function shopping(req:Request,res:Response){
    const card = await verifyingIfTheCardExists(req.body.cardId);
    verifyingIfTheCardIsActivated(card.password);
    verifyingIfTheCardExpiration(card.expirationDate);
    verifyingIfTheCardIsBlocked(card.isBlocked);
    checkingPassword(card.password,req.body.password);
    const business = await verifyingBusiness(req.body.businessId);
    verifyingType(card.type,business.type);
    await validatingPurchase(req.body.cardId,req.body.amount)
    await buying(req.body.cardId,req.body.businessId,req.body.amount);
    res.sendStatus(201);
}