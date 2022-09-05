import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as cardServices from "../services/cardServices";
import { faker } from '@faker-js/faker';
import { Request, Response } from "express";
import Cryptr from "cryptr";
import bcrypt from 'bcrypt';
import dayjs from "dayjs";
import dotenv from "dotenv";
import { findById } from "../repositories/businessRepository";
dotenv.config();


export async function verifyingIfTheCardExists(id: number) {
    const card = await cardRepository.findById(id);
    if (card === undefined) {
        throw ('The id informed does not match with any card registered');
    }
    return card;
}

export function verifyingIfTheCardIsActivated(password: any) {
    if (!password) {
        throw ('The informed card has not been activated yet');
    }
}

export function verifyingIfTheCardExpiration(expirationDate: string) {
    const dates = expirationDate.split('/');
    if (Number(dates[1]) < Number(dayjs().format('YY'))) {
        throw ('The informed card has already expired');
    }
    if ((Number(dates[1]) === (Number(dayjs().format('YY')))) && (Number(dates[0]) < (Number(dayjs().format('MM'))))) {
        throw ('The informed card has already expired');
    }
}

export function verifyingIfTheCardIsBlocked(isBlocked: boolean) {
    if (isBlocked === true) {
        throw ('The card is blocked');
    }
}

export function checkingPassword(hashedpassword: any, password: string) {

    const isCorrect = bcrypt.compareSync(password, hashedpassword);
    if (isCorrect === false) {
        throw ('Wrong password');
    }
}

export async function verifyingBusiness(id:number){
    const business = await findById(id);
    if(!business){
        throw('Business not registered');
    }
    return business;
}

export function verifyingType(cardType:string,businessType:string){
    if(cardType!==businessType){
        throw('This card is not allowed to be used on this type of business');
    }
}

export async function validatingPurchase(id:number, amount:number){
    const {balance} = await cardServices.gettingBalance(id);
    if(balance<amount){
        throw('The card does not have credit enough for this purchase');
    }
}

export async function buying(cardId:number,businessId:number,amount:number){
    await paymentRepository.insert({cardId,businessId,amount});
}

