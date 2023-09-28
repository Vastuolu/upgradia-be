import { PrismaClient } from "@prisma/client";
import { hashing } from "../../middleware/hashing";
import {returnHandler as retHandler} from '../../helper/response'
import { v4 as idmaker } from 'uuid';
import { UserInterface } from './interfaces'
import bcrypt from 'bcrypt'
import { sign } from "../../middleware/auth";

const prisma = new PrismaClient()

export async function getUsers(){
    try {
        console.log('You get here')
        const gettedUser = await prisma.user.findMany()
        console.log(gettedUser)
        if(!gettedUser || gettedUser.length === 0) return retHandler(404, true, "Table User is empty", null)
        return retHandler(200, false, "Get Users Success", gettedUser)
    } catch (error) {
        return retHandler(500, true, "Get Users Error", {error: error})
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

export async function createUser(username: string, email: string, password1: string) {
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


export async function updateUser({id, username, email, password}:UserInterface){
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

export async function deleteUser(id:string) {
    try {
        const findUser = await prisma.user.findUnique({where:{id:id}})
        if(!findUser) return retHandler(404, true, "User Not Found", null)
        await prisma.user.delete({where:{id:id}})
        return retHandler(200, false, "Delete User Success", null)
    } catch (error) {
        return retHandler(500, true, "Delete User Error", {error: error}) 
    }
}

export async function login(email:string, password:string) {
    try {
        const getUser = await prisma.user.findUnique({where:{email:email}})
        if(!getUser) return retHandler(404, true, "User Not Found", null)
        const passwordMatch = await bcrypt.compare(password, getUser.password)
        if(!passwordMatch) retHandler(403, true, "Password Wrong", null)
        const token = await sign(getUser.id, getUser.username as string)
        return retHandler(200, false, "Login Success", {token: token})
    } catch (error) {
        console.log(error)
        return retHandler(500, true, "Login Error", {error: error})
    }    
}
