import { Router } from "express";
import { creatingCard } from "../controllers/cardsControllers";
import { validatingCardInfos, validatingKey } from "../middlewares/cardInfosValidation";

const cardsRoutes = Router();

cardsRoutes.post('/cards', validatingKey,validatingCardInfos,creatingCard);//card creation
cardsRoutes.patch('/cards/:id/active');//card activation
cardsRoutes.get('/cards/:id');//card data visualization
cardsRoutes.patch('/cards/:id/block');//card block
cardsRoutes.patch('/cards/:id/unblock');//card unblock

export default cardsRoutes;