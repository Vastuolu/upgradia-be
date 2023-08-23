import { Router, Request, Response } from 'express'
import response from '../../helper/response'
import { postMethod, putMethod } from './controller'

export const userRoutes = Router()

userRoutes.get('/', (req: Request, res: Response)=>{
    return response(200, "This is User Routes", null, res)
})

userRoutes.post('/', postMethod)
userRoutes.put('/:id', putMethod)