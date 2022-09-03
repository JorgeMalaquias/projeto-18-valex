import { Router } from "express";

const cardsRoutes = Router();

cardsRoutes.post('/cards');//card creation
cardsRoutes.patch('/cards/:id/active');//card activation
cardsRoutes.get('/cards/:id');//card data visualization
cardsRoutes.patch('/cards/:id/block');//card block
cardsRoutes.patch('/cards/:id/unblock');//card unblock

export default cardsRoutes;