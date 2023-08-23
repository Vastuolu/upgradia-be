import { PrismaClient } from "@prisma/client";
import { emailValidation } from "../../helper/emailValidation";
import { hashing } from "../../middleware/hashing";
import respond from '../../helper/response'
import { v4 as idmaker } from 'uuid';
import { UserInterface } from './interfaces'

const prisma = new PrismaClient()

export async function getUsers(){
    const data = await prisma.user.findMany()
    return data
}

export async function getUserById(id: string){
    try {
        const data = await prisma.user.findUnique({where:{id: String(id)}})
        if(!data){
            return false
        }
        return data
    } catch (error) {
        throw Error('Server Error (500)')
    }
}

export async function createUser(username: string, email: string, password1: string) {
    try {
        if (!username || !email || !password1) throw Error('Some fields are still empty');
        
        const password = await hashing(password1); // Await the hashing function
        
        const data = await prisma.user.create({
            data: {
                id: idmaker(),
                username,
                email,
                password,
            },
        });

        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


export async function userUpdate(id : string, data: UserInterface){
    try {
        const updateUser = await prisma.user.update({
            where: { id },
            data
        })
        return updateUser
    } catch (error) {
        return false
    }
}

