import { Router } from 'express'
import { getMethod ,getMethodId,postMethod, putMethod, deleteMethod} from './controller.blog'

export const blogRoutes = Router()

blogRoutes.get('/', getMethod)
blogRoutes.get('/:id', getMethodId)
blogRoutes.post('/', postMethod)
blogRoutes.put('/:id', putMethod)
blogRoutes.delete('/:id', deleteMethod)