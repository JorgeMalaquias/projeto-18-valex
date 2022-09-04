import { Request, Response } from "express";
import { insert } from "../repositories/cardRepository";
import { generatingDataToNewCard, validatingDataFromNewCardRequest } from "../services/cardServices";

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