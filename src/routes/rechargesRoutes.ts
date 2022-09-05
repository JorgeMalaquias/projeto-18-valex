import { Router } from "express";
import { rechargingCard } from "../controllers/rechargesController";
import { validatingKey } from "../middlewares/cardsValidation";
import { validatingRechargeInfos } from "../middlewares/rechargesValidation";

const rechargesRoutes = Router();

rechargesRoutes.post('/recharges',validatingKey,validatingRechargeInfos,rechargingCard);

export default rechargesRoutes;