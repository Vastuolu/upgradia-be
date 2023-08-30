import {respond} from '../helper/response'
import { Response } from 'express'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function emailValidation(email:string, res: Response){
    if(!emailRegex.test(email)){
        respond(400, true, "Invalid Email", null, res)
        return false
    }
    return true
}