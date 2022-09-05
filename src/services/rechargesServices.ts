
import * as rechargeRepository from "../repositories/rechargeRepository";
import dotenv from "dotenv";
dotenv.config();

export async function recharging(cardId:number,amount:number){
    await rechargeRepository.insert({cardId,amount});
}