import { Router, Request, Response } from "express";
import { deleteMethod, getMethod, getMethodId, postMethod, putMethod } from "./controller.project";
import { auth } from "../../middleware/auth";

export const projectRoutes = Router()

projectRoutes.get('/',getMethod)
projectRoutes.get('/:id',getMethodId)
projectRoutes.post('/',auth, postMethod)
projectRoutes.put('/:id',auth, putMethod)
projectRoutes.delete('/:id',auth, deleteMethod)

