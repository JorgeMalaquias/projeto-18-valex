import { Router } from "express";
import cardsRoutes from "./cardsRoutes";
import purchasesRoutes from "./purchasesRoutes";
import rechargesRoutes from "./rechargesRoutes";

const routes = Router();

routes.use(cardsRoutes);
routes.use(rechargesRoutes);
routes.use(purchasesRoutes);

export default routes;