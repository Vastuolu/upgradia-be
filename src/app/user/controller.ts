import {Request, Response} from 'express'
import respond from '../../helper/response'
import { emailValidation } from '../../helper/emailValidation'
import { createUser, getUsers, getUserById, userUpdate} from './service'
import { UserInterface } from './interfaces'

export async function postMethod(req: Request, res: Response){
    const { username, email, password } = req.body
    try {
        if(!emailValidation(email)){
            respond(400, "Invalid Email", null, res)
        }
        const result = await createUser(username, email, password)
        console.log(result)
        return respond(200, "Success", result, res)
    } catch (error) {
        respond(400, "error creating user", null, res)
        return
    }
}

export function putMethod(req: Request, res: Response){
    const { id, username, email, password } = req.body
    const data = {
        id: id,
        username: username,
        email: email,
        password: password
    }
    const result = userUpdate(id, data)
    respond(201, "Success", data, res)
}
