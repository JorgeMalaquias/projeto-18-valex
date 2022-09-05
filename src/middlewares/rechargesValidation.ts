import { Request, Response } from "express";
import { newRechargeSchema } from "../schemas/rechargesSchemas";
import { validateSchema } from "./validateSchema";

export function validatingRechargeInfos(req: Request, res: Response,next:any) {
    validateSchema(newRechargeSchema);
    if(req.body.amount<=0){
        throw('The value of the recharge must be higher than zero')
    }
    next();
}