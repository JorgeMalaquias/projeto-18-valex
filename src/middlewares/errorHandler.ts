
import { Request, Response } from "express";

export function errorHandlingMiddleware(error:any, req:Request, res:Response, next:any) {

	if (error === 'The employee informed already has a card with the the type solicited') return res.status(409).send(error);

	if (error === 'The apiKey informed does not correspond to any company registered') return res.status(404).send(error);

	if (error === 'The id informed does not correspond to any employee registered') return res.status(404).send(error);
	
	if (error === 'The id informed does not match with any card registered') return res.status(404).send(error);

	if (error === 'The informed card has already expired') return res.status(400).send(error);

	if (error === 'The informed CVC is incorrect') return res.status(400).send(error);

	if (error === 'Wrong password') return res.status(400).send(error);

	if (error === 'The informed card has already been activated') return res.status(409).send(error);

	if (error === 'The card is already blocked') return res.status(409).send(error);
	if (error === 'The card is already unblocked') return res.status(409).send(error);
	
	if(error.name) return res.status(400).send('Invalid input data');
	
	
	
	if (error === 'The value of the purchase must be higher than zero') return res.status(400).send(error);
	
	
	if (error === 'The informed card has not been activated yet') return res.status(400).send(error);
	if (error === 'The card is blocked') return res.status(400).send(error);
	if (error === 'Business not registered') return res.status(400).send(error);
	if (error === 'This card is not allowed to be used on this type of business') return res.status(400).send(error);
	if (error === 'The card does not have credit enough for this purchase') return res.status(400).send(error);
	if (error === 'The value of the recharge must be higher than zero') return res.status(400).send(error);
	//if (error === ) return res.status(409).send(error);
	//if (error === ) return res.status(409).send(error);
	//if (error === ) return res.status(409).send(error);
	//if (error === ) return res.status(409).send(error);
	
	return res.status(500).send(error);
}