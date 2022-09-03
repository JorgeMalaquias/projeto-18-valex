import express from "express";
import { Request, Response } from "express";

export function errorHandlingMiddleware(error:any, req:Request, res:Response, next:any) {
	//if (error.type === "error_...") return res.sendStatus(...);
	//if (error.type === "error_...") return res.sendStatus(...);
	//if (error.type === "error_...") return res.sendStatus(...);

	return res.status(500).send(error);
}