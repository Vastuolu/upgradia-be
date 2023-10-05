import { Router, Request, Response} from 'express'
import { saveFileBlog, saveFileProject, uploadValidateProject, uploadValidateBlog, multipleUploads} from './multer'
import { respond } from '../../helper/response'  
import {v4 as idmaker} from 'uuid'

export const FileRoutes = Router()

FileRoutes.post('/project/:id', uploadValidateProject , async (req: Request, res: Response)=>{
    try {
        const filePrefix = Date.now()
        const projectId = parseInt(req.params.id)
        const createdData = await multipleUploads(filePrefix.toString(), projectId, 3, "project",req,res)
        return respond(200, false, "Upload Image Success", createdData, res)
    } catch (error) {
        return respond(500, true, "Upload Image Error", {error:error},res)   
    }
    }      
)

FileRoutes.post('/blog/:id', uploadValidateBlog, async (req: Request, res: Response)=>{
    try {
        const filePrefix = idmaker()
        const blogId = parseInt(req.params.id)
        const createdData = await multipleUploads(filePrefix, blogId, 12, "blog",req,res)
        return respond(200, false, "Upload Image Success", createdData, res)
    } catch (error) {
        return respond(500, true, "Upload Image Error", {error:error}, res)   
    }
    }      
)

