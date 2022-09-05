import { Router } from "express";
import { shopping } from "../controllers/purchasesControllers";
import { validatingShoppingInfos } from "../middlewares/purchasesValidation";

const purchasesRoutes = Router();

purchasesRoutes.post('/purchases',validatingShoppingInfos,shopping);

export default purchasesRoutes;