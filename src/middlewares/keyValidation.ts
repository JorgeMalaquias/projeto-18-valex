import { Request, Response } from "express";
import { newCardSchema } from "../schemas/newCardSchema";
import { validateSchema } from "./validateSchema";

export function validatingKey(req: Request, res: Response) {
    const { x_api_key } = req.headers;
    if (!x_api_key) {
        throw ('key was not informed or not valid');
    }
}

export function validatingCardInfos(req: Request, res: Response) {
    validateSchema(newCardSchema);
}

