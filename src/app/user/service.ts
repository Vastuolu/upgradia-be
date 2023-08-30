import { PrismaClient } from "@prisma/client";
import { hashing } from "../../middleware/hashing";
import {returnHandler as retHandler} from '../../helper/response'
import { v4 as idmaker } from 'uuid';
import { UserInterface } from './interfaces'

const prisma = new PrismaClient()

export async function getUsers(){
    try {
        const gettedUser = await prisma.user.findMany()
        return retHandler(200, false, "Get User Success", gettedUser)
    } catch (error) {
        return retHandler(500, true, "Get User Error", {error: error})
    }
}

export async function getUserById(id: string){
    try {
        const gettedUser = await prisma.user.findUnique({where:{id: String(id)}})
        if(!gettedUser)return retHandler(404, true, "User Not Found", null) 
        return retHandler(200, false, "Get User Success", gettedUser)
    } catch (error) {
        return retHandler(500, true, "Get User Error", {error: error})
    }
}

export async function userCreate(username: string, email: string, password1: string) {
    const password = await hashing(password1); // Await the hashing function
    try {
        const createdUser = await prisma.user.create({
            data: {
                id: idmaker(),
                username,
                email,
                password,
            },
        });
        return retHandler(200, false, "Create User Success", createdUser)
    } catch (error) {
        return retHandler(500, true, "Create User Error", {error: error})
    }
}


export async function userUpdate({id, username, email, password}:UserInterface){
    try {
        const findUser = await prisma.user.findUnique({where:{id:id}})
        if(!findUser)return retHandler(404, true, "User Not Found", null) 
        const updatedUser = await prisma.user.update({
            where: { id:id },data:{
                username:username,
                email:email,
                password:password
            }
        })
        return retHandler(200, false, "Update User Success", updatedUser)
    } catch (error) {
        return retHandler(500, true, "Update User Error", {error: error})
    }
}

export async function userDelete(id:string) {
    try {
        await prisma.user.delete({where:{id:id}})
        return retHandler(200, false, "Delete User Success", null)
    } catch (error) {
        return retHandler(500, true, "Delete User Error", {error: error}) 
    }
}


