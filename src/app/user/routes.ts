import { Router, Request, Response } from 'express'
import { getMethod ,getMethodId,postMethod, putMethod, deleteMethod, LoginMethod } from './controller'
import { auth } from '../../middleware/auth'
import dotenv from 'dotenv'
dotenv.config();
export const userRoutes = Router()
userRoutes.get('/', auth, getMethod)
userRoutes.get('/:id',auth, getMethodId)
userRoutes.post('/login', LoginMethod)
userRoutes.put('/:id',auth, putMethod)
userRoutes.delete('/:id',auth, deleteMethod)
if(process.env.NODE_ENV === 'development'){
    userRoutes.post('/', postMethod)
}else{
    userRoutes.post('/',auth, postMethod)
}
