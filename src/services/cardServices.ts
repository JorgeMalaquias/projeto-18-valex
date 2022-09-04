import { findByCardNumber, findByTypeAndEmployeeId } from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";
import { faker } from '@faker-js/faker';
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();


export async function validatingDataFromNewCardRequest(apiKey: string, employeeId: number, type: any) {
    
    const company = await findByApiKey(apiKey);
    if (company===undefined) {
        throw ('The apiKey informed does not correspond to any company registered');
    }
    const employee = await findById(employeeId);
    if (employee===undefined) {
        throw ('The id informed does not correspond to any employee registered');
    }
    const currentCard = await findByTypeAndEmployeeId(type, employeeId);
    if (currentCard!==undefined) {
        throw ('The employee informed already has a card with the the type solicited');
    }
    return employee.fullName;
}



export async function generatingDataToNewCard(fullName: string) {
    const number:string = await generatingNumberToNewCard();
    const cardholderName:string  = generatingNameToNewCard(fullName);
    const expirationDate:string  = generatingExpirationToNewCard();
    const securityCode:string  = generatingCVCToNewCard();
    return{
        number,
        cardholderName,
        securityCode,
        expirationDate
    }
}



async function generatingNumberToNewCard() {
    let currentCard:any= 1;
    let newCardNumber:string;
    do {
        newCardNumber = faker.random.numeric(16);
        currentCard = await findByCardNumber(newCardNumber);
    } while (currentCard!==undefined)
    return newCardNumber;
}

function generatingNameToNewCard(fullName: string) {

    const namesFromFullName:string[] = fullName.split(' ');

    let middleNames = '';
    for (let i: number = 1; i < namesFromFullName.length - 2; i++) {
        if (namesFromFullName[i].length >= 3) {
            middleNames += namesFromFullName[i][0] + ' ';
        }
    }

    return namesFromFullName[0] + ' ' + middleNames + namesFromFullName[namesFromFullName.length - 1];
}

function generatingExpirationToNewCard() {
    const yearOfExpiration = ('0' + (new Date().getMonth().toString())).slice(-2) + '/' + (new Date().getFullYear() + 5).toString().slice(-2);
    return yearOfExpiration;
}

function generatingCVCToNewCard() {
    const crypt: any = new Cryptr('SECRET_KEY');
    const cvc = faker.random.numeric(3);
    const encryptedCvc = crypt.encrypt(cvc);
    return encryptedCvc;
}