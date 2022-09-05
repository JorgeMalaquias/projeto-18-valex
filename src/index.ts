import express from "express";
import "express-async-errors";
import cors from 'cors';
import routes from "./routes/routes";
import dotenv from 'dotenv'
import { errorHandlingMiddleware } from "./middlewares/errorHandler";
dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);
server.use(errorHandlingMiddleware);

server.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})



