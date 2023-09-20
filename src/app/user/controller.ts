import {Request, Response} from 'express'
import {respond} from '../../helper/response'
import { emailValidation } from '../../helper/emailValidation'
import { hashing } from "../../middleware/hashing";

import { userCreate, getUsers, getUserById, userUpdate, userDelete, login} from './service'

export async function getMethod(res:Response) {
    const {data,message,status,isError} = await getUsers()
    return respond(status,isError, message, data, res)
}

export async function getMethodId(req:Request, res:Response) {
    const {data,message,status,isError} = await getUserById(req.params.id)
    return respond(status, isError, message, data, res)
}

export async function postMethod(req:Request,res:Response){
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return respond(400, true, "Some fields are still empty", null, res)
    }
    if(!emailValidation(email,res)) return
        const {data,isError,message,status} = await createUser(username, email, password)
        return respond(status,isError, message, data, res)
}

export async function putMethod(req:Request, res:Response){
    const id = req.params.id
    const { username:nullUsername, email:nullEmail, password:nullPassword } = req.body
    let username, email, password
    if(nullUsername) username = nullUsername
    if(nullEmail){
        email = nullEmail
        if(!emailValidation(email,res)) return
    }
    if(nullPassword)password = await hashing(nullPassword)
    const inputData = {
        id,username,email,password
    }
    const {status, isError, data, message} = await updateUser(inputData)
    return respond(status,isError, message, data, res)
}

export async function deleteMethod(req:Request, res:Response) {
    const {data,isError,message,status} = await deleteUser(req.params.id)
    return respond(status,isError, message, data, res)
}

export async function LoginMethod(req:Request, res:Response) {
    const {email, password} = req.body
    const {data,isError,message,status} = await login(email, password)
    return respond(status,isError, message, data, res)    
}