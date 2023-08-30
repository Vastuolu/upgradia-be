import {Response,Request} from 'express'
export interface UserInterface{
    id?:string
    username?: string
    email?: string
    password?: string
}