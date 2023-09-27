import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response, Request, NextFunction } from 'express';
import {respond} from '../helper/response'
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
        if(authHeader){
            const token:string = authHeader.split(' ')[1]
            console.log(token)
            jwt.verify(token, SECRET, (err:any, user:any)=>{
                if(err){
                console.log(err)
                return respond(400, true, "Invalid Token", {error:err}, res)            }
                // req.user = user 
                return next();
            });
        } else {
            return respond(403, true, "Forbidden", null, res); // Hanya satu tanggapan
        }
    }