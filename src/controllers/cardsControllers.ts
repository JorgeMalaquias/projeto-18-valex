import { Request, Response } from "express";
import { insert } from "../repositories/cardRepository";
import { comparingSecurityCode, creatingPassword, generatingDataToNewCard, unBlockingCard, validatingDataFromNewCardRequest, verifyingIfTheCardExists, verifyingIfTheCardExpiration, verifyingIfTheCardIsActivated } from "../services/cardServices";

export async function creatingCard(req:Request,res:Response){
    const fullName:string = await validatingDataFromNewCardRequest(res.locals.apiKey,req.body.employeeId,req.body.type);
    const dataGenerated = await generatingDataToNewCard(fullName);;
    const newCardData = {...req.body,
        ...dataGenerated,
        isVirtual:false,
        isBlocked: true
    }
    await insert(newCardData);
    res.sendStatus(201);
}

export async function activatingCard(req:Request,res:Response){

    const card = await verifyingIfTheCardExists(req.body.id);
    verifyingIfTheCardExpiration(card.expirationDate);
    verifyingIfTheCardIsActivated(card.password);
    comparingSecurityCode(req.body.securityCode,card.securityCode);
    await creatingPassword(req.body.id,req.body.password);
    await unBlockingCard(req.body.id);
    res.sendStatus(201);
}
