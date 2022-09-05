import { Router } from "express";
import { activatingCard, blocking, creatingCard, gettingBalanceFromCard, unBlocking } from "../controllers/cardsControllers";
import { validatingCardActivationInfos, validatingCardBlockingInfos, validatingCardInfos, validatingKey } from "../middlewares/cardsValidation";
import { decripting, testing } from "../services/cardServices";

const cardsRoutes = Router();

cardsRoutes.post('/cards', validatingKey,validatingCardInfos,creatingCard);//card creation
cardsRoutes.patch('/cards/active',validatingCardActivationInfos, activatingCard);//card activation
cardsRoutes.get('/cards/:id', gettingBalanceFromCard);//card data visualization
cardsRoutes.patch('/cards/block', validatingCardBlockingInfos,blocking);//card block
cardsRoutes.patch('/cards/unblock',validatingCardBlockingInfos, unBlocking);//card unblock

//deletar
cardsRoutes.get('/cvc/:string',decripting);
cardsRoutes.get('/test',testing);

export default cardsRoutes;