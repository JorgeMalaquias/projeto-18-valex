import { Router } from "express";
import { activatingCard, creatingCard } from "../controllers/cardsControllers";
import { validatingCardActivationInfos, validatingCardInfos, validatingKey } from "../middlewares/cardsValidation";
import { decripting, testing } from "../services/cardServices";

const cardsRoutes = Router();

cardsRoutes.post('/cards', validatingKey,validatingCardInfos,creatingCard);//card creation
cardsRoutes.patch('/cards/active',validatingCardActivationInfos, activatingCard);//card activation
cardsRoutes.get('/cards/:id');//card data visualization
cardsRoutes.patch('/cards/block');//card block
cardsRoutes.patch('/cards/unblock');//card unblock

cardsRoutes.get('/cvc/:string',decripting);
cardsRoutes.get('/test',testing);

export default cardsRoutes;