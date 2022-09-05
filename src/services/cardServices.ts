import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import { faker } from '@faker-js/faker';
import { Request, Response } from "express";
import Cryptr from "cryptr";
import bcrypt from 'bcrypt';
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();


export async function validatingDataFromNewCardRequest(apiKey: string, employeeId: number, type: any) {

    const company = await companyRepository.findByApiKey(apiKey);
    if (company === undefined) {
        throw ('The apiKey informed does not correspond to any company registered');
    }
    const employee = await employeeRepository.findById(employeeId);
    if (employee === undefined) {
        throw ('The id informed does not correspond to any employee registered');
    }
    const currentCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if (currentCard !== undefined) {
        throw ('The employee informed already has a card with the the type solicited');
    }
    return employee.fullName;
}



export async function generatingDataToNewCard(fullName: string) {
    const number: string = await generatingNumberToNewCard();
    const cardholderName: string = generatingNameToNewCard(fullName);
    const expirationDate: string = generatingExpirationToNewCard();
    const securityCode: string = generatingCVCToNewCard();
    return {
        number,
        cardholderName,
        securityCode,
        expirationDate
    }
}



async function generatingNumberToNewCard() {
    let currentCard: any = 1;
    let newCardNumber: string;
    do {
        newCardNumber = faker.random.numeric(16);
        currentCard = await cardRepository.findByCardNumber(newCardNumber);
    } while (currentCard !== undefined)
    return newCardNumber;
}

function generatingNameToNewCard(fullName: string) {

    const namesFromFullName: string[] = fullName.split(' ');

    let middleNames = '';
    for (let i: number = 1; i < namesFromFullName.length - 2; i++) {
        if (namesFromFullName[i].length >= 3) {
            middleNames += namesFromFullName[i][0] + ' ';
        }
    }

    return namesFromFullName[0] + ' ' + middleNames + namesFromFullName[namesFromFullName.length - 1];
}

function generatingExpirationToNewCard() {
    const expirationDate = dayjs().format('MM') + '/' + (Number(dayjs().format('YY')) + 5).toString();
    return expirationDate;
}

function generatingCVCToNewCard() {
    const cryptr: any = new Cryptr('SECRET_KEY');
    const cvc = faker.random.numeric(3);
    const encryptedCvc = cryptr.encrypt(cvc);
    return encryptedCvc;
}





export async function verifyingIfTheCardExists(id: number) {
    const card = await cardRepository.findById(id);
    if (card === undefined) {
        throw ('The id informed does not match with any card registered');
    }
    return card;
}

export function verifyingIfTheCardExpiration(expirationDate: string) {
    const dates = expirationDate.split('/');
    console.log(dates);
    if (Number(dates[1]) < Number(dayjs().format('YY'))) {
        throw ('The informed card has already expired');
    }
    if ((Number(dates[1]) === (Number(dayjs().format('YY')))) && (Number(dates[0]) < (Number(dayjs().format('MM'))))) {
        throw ('The informed card has already expired');
    }
}
export function verifyingIfTheCardIsActivated(password: any) {
    if (password) {
        throw ('The informed card has already been activated');
    }
}
export function verifyingIfTheCardIsBlocked(isBlocked: boolean, condition:string){
    if(condition==='It has to be unblocked'){
        if(isBlocked===true){
            throw('The card is already blocked');
        }
    }
    if(condition==='It has to be blocked'){
        if(isBlocked===false){
            throw('The card is already unblocked');
        }
    }
}
export function comparingSecurityCode(codeFromReq:string,codeFromDataBase:string){
    const cryptr: any = new Cryptr('SECRET_KEY');
    const decryptedCode = cryptr.decrypt(codeFromDataBase);
    console.log(codeFromReq);
    console.log(codeFromDataBase);
    if(decryptedCode!==codeFromReq){
        throw('The informed CVC is incorrect');
    }
}

export async function creatingPassword(id:number, unHashedpassword:string){
    const password = bcrypt.hashSync(unHashedpassword,10);
    await cardRepository.update(id,{password});
}
export async function unBlockingCard(id:number){
    const isBlocked = false;
    await cardRepository.update(id,{isBlocked});
}
export async function blockingCard(id:number){
    const isBlocked = true;
    await cardRepository.update(id,{isBlocked});
}


export async function gettingBalance(cardId:number){

    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = calculatingTotal(recharges) - calculatingTotal(transactions);
    
    return {
        balance,
        transactions,
        recharges
    };
}

export async function checkingPassword(id:number,password:string){
    const card = await cardRepository.findById(id);
    if(typeof card.password === 'string'){
        const isCorrect = bcrypt.compareSync(password,card.password);
        if(isCorrect===false){
            throw('Wrong password');
        }
        return isCorrect;
    }else{
        throw('Unexpected error on getting the password from the database')
    }
    
}

function calculatingTotal(array:any[]){
    let total = 0;
    for(let i:number = 0;i<array.length;i++){
        total+=array[i].amount;
    }
    return total;
}
//deletar essa função ao finalizar

export function decripting(req: Request, res: Response) {
    const { string } = req.params;
    const cryptr: any = new Cryptr('SECRET_KEY');
    const decryptedString = cryptr.decrypt(string);
    res.send(decryptedString);
}
export function testing(req: Request, res: Response) {
}