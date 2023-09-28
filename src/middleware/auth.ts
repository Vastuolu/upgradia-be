import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response, Request, NextFunction } from 'express';
import {respond} from '../helper/response'
import { error } from 'console';
dotenv.config()
const SECRET: jwt.Secret = process.env.SECRET || "Secret";

export function sign(id: string, name: string): Promise<string|undefined> {
    return new Promise((resolve, reject) => {
        try {
            if (!name || !SECRET) {
                throw new Error('Name or SECRET is undefined');
            }
            const data = {
                id: id,
                username: name
            };

            jwt.sign(data, SECRET, {expiresIn: "7d" }, function (err, token) {
                if (err) {
                    reject(err);
                } else {
                    resolve("Bearer "+token);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}
    
export function auth(req: Request, res:Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader) return respond(401, true, "Unauthorized", null, res)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, SECRET, (err, user)=>{
        if(err) {
            return respond(403, true, "Forbidden", err, res)
        }
        console.log(user)
        return next()
    })
}