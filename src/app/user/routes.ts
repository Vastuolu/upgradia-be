import { Router, Request, Response } from 'express'
import { getMethod ,getMethodId,postMethod, putMethod, deleteMethod } from './controller'
import { auth } from '../../middleware/auth'

export const userRoutes = Router()

userRoutes.get('/',auth, getMethod)
userRoutes.get('/:id', getMethodId)
userRoutes.post('/', postMethod)
userRoutes.put('/:id', putMethod)
userRoutes.delete('/:id', deleteMethod)