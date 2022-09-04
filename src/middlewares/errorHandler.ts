
import { Request, Response } from "express";

export function errorHandlingMiddleware(error:any, req:Request, res:Response, next:any) {
	if (error === 'The employee informed already has a card with the the type solicited') return res.status(409).send(error);
	if (error === 'The apiKey informed does not correspond to any company registered') return res.status(404).send(error);
	if (error === 'The id informed does not correspond to any employee registered') return res.status(404).send(error);
	//if (error === ) return res.status(409).send(error);
	console.log(error);
	return res.status(500).send(error);
}