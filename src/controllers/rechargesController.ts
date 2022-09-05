import { Request, Response } from "express";
import { buying, checkingPassword, validatingPurchase, verifyingBusiness, verifyingIfTheCardExists, verifyingIfTheCardExpiration, verifyingIfTheCardIsActivated, verifyingIfTheCardIsBlocked, verifyingType } from "../services/purchasesServices";
import { recharging } from "../services/rechargesServices";

export async function rechargingCard(req:Request,res:Response){
    const card = await verifyingIfTheCardExists(req.body.cardId);
    verifyingIfTheCardIsActivated(card.password);
    verifyingIfTheCardExpiration(card.expirationDate);
    await recharging(req.body.cardId,req.body.amount);
    res.sendStatus(201);
}