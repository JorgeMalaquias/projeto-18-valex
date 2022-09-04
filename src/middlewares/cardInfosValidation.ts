import { Request, Response } from "express";
import { nextTick } from "process";
import { newCardSchema } from "../schemas/newCardSchema";
import { validateSchema } from "./validateSchema";

export function validatingKey(req: Request, res: Response,next:any) {
    const { x_api_key } = req.headers;
    if (!x_api_key) {
        throw ('key was not informed or not valid');
    }
    res.locals.apiKey = x_api_key;
    next();
}

export function validatingCardInfos(req: Request, res: Response,next:any) {
    validateSchema(newCardSchema);
    next();
}

