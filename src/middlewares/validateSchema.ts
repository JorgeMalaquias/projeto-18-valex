import { Request, Response } from "express";

export function validateSchema(schema:any) {
    return (req:Request, res:Response, next:any) => { 
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        throw (error.details);
      }
    }
}