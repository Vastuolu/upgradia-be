import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response, Request, NextFunction } from 'express';
import respond from '../helper/response'
dotenv.config()
const SECRET: jwt.Secret = process.env.SECRET || 'Secret';

export function sign(id: number, name: string){
    try {
        const data = {
            id: id,
            username: name
        }

        jwt.sign(data, SECRET, {algorithm: 'RS256'}, function(err, token){
            return token
        })
    } catch (error) {
        throw new Error('Error Hashing Password')
    }
}

export function auth(req: Request, res:Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(authHeader){
        const token:string = authHeader.split(' ')[1]
        jwt.verify(token, SECRET, (err:any, user:any)=>{
            if(err){
                return respond(400, "Invalid Token", null, res)            }
            // req.user = user
            next()
        })
    }
}