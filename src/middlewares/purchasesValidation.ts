import { Request, Response } from "express";
import { newShoppingSchema } from "../schemas/purchasesSchemas";
import { validateSchema } from "./validateSchema";

export function validatingShoppingInfos(req: Request, res: Response,next:any) {
    validateSchema(newShoppingSchema);
    if(req.body.amount<=0){
        throw('The value of the purchase must be higher than zero')
    }
    next();
}