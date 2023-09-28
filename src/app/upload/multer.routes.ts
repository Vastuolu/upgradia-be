import { Router, Request, Response} from 'express'
import { upload, saveFileBlog, saveFileProject} from './multer'
import { respond } from '../../helper/response'  

export const FileRoutes = Router()

FileRoutes.post('/project', upload.array('image' , 3), async (req: Request, res: Response)=>{
    try {
        const files = req.files as Express.Multer.File[]
        if(!files) return respond(304, true, "No image found", null, res)
        const projectId = parseInt(req.body.projecId)
        // const projectId = parseInt(req.params.id)
    const createdData: Array<object> = await Promise.all(
        files.map(async (gettedFiles: Express.Multer.File) => {
            const gettedFilename = gettedFiles.originalname
            const databaseData = await saveFileProject(gettedFilename, projectId)
            const mappedData = {
                id:databaseData.id,
                projectId: databaseData.projectId,
                filename: databaseData.filename
            }
            console.log(mappedData)
            return mappedData
        }))
        return respond(200, false, "Upload Image Success", createdData, res)
    } catch (error) {
        return respond(500, true, "Upload Image Error", {error:error},res)   
    }
    }      
)

FileRoutes.post('/blog', upload.array('image', 12), async (req: Request, res: Response)=>{
    try {
        const files = req.files as Express.Multer.File[]
        if(!files) return respond(304, true, "No image found", null, res)
        const blogId = parseInt(req.body.blogId)
        // const blogId = parseInt(req.params.id)
        const createdData: Array<object> = await Promise.all(
        files.map(async (gettedFiles: Express.Multer.File) => {
            const gettedFilename = gettedFiles.originalname
            const databaseData = await saveFileBlog(gettedFilename, blogId)
            const mappedData = {
                id:databaseData.id,
                projectId: databaseData.blogId,
                filename: databaseData.filename
            }
            console.log(mappedData)
            return mappedData
        }))
        return respond(200, false, "Upload Image Success", createdData, res)
    } catch (error) {
        return respond(500, true, "Upload Image Error", {error:error}, res)   
    }
    }      
)

