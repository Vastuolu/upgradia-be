import { Router, Request, Response} from 'express'
import { upload, saveFileBlog, saveFileProject, uploadValidateProject, uploadValidateBlog} from './multer'
import { respond } from '../../helper/response'  

export const FileRoutes = Router()

FileRoutes.post('/project/:id', uploadValidateProject,upload.array('image' , 3), async (req: Request, res: Response)=>{
    try {
        if(req.files.length === 0) return respond(400, true, "No Image Included", null, res)
        const files = req.files as Express.Multer.File[]
        const projectId = parseInt(req.params.id)
        const createdData: Array<object> = await Promise.all(
        files.map(async (gettedFiles: Express.Multer.File) => {
            const gettedFilename = gettedFiles.originalname
            const databaseData = await saveFileProject(gettedFilename, projectId)
            const mappedData = {
                id:databaseData.id,
                projectId: databaseData.projectId,
                filename: databaseData.filename
            }
            return mappedData
        }))
        return respond(200, false, "Upload Image Success", createdData, res)
    } catch (error) {
        return respond(500, true, "Upload Image Error", {error:error},res)   
    }
    }      
)

FileRoutes.post('/blog/:id', uploadValidateBlog, upload.array('image', 12), async (req: Request, res: Response)=>{
    try {
        if(req.files.length === 0) return respond(400, true, "No Image Included", null, res)
        const files = req.files as Express.Multer.File[]
        const blogId = parseInt(req.params.id)
        const createdData: Array<object> = await Promise.all(
        files.map(async (gettedFiles: Express.Multer.File) => {
            const gettedFilename = gettedFiles.originalname
            const databaseData = await saveFileBlog(gettedFilename, blogId)
            const mappedData = {
                id:databaseData.id,
                blogId: databaseData.blogId,
                filename: databaseData.filename
            }
            return mappedData
        }))
        return respond(200, false, "Upload Image Success", createdData, res)
    } catch (error) {
        return respond(500, true, "Upload Image Error", {error:error}, res)   
    }
    }      
)

