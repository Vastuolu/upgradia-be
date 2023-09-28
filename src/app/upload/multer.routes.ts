import { Router, Request, Response, response } from 'express'
import { upload, saveFileBlog, saveFileProject} from './multer'
import { respond, returnHandler as retHandler } from '../../helper/response'  


export const FileRoutes = Router()

FileRoutes.post('/project', upload.single('image'), async (req: Request, res: Response)=>{
    	if(!req.file){return retHandler(500, true, "There Is No Files", null)}
	const fileName = req.file.originalname
	const {data,isError,message,status} = await saveFileProject(fileName, req.body.projectId)
    return respond(status,isError, message, data, res)
}
)

FileRoutes.post('/blog', upload.single('image'), async (req: Request, res: Response)=>{
    if(!req.file){return respond(500, true, "There Is No Files", null ,res)}
	const fileName = req.file.originalname
	const {data, isError, message, status} = await saveFileBlog(fileName, req.body.blogId)
    return respond(status,isError, message, data, res)
    }
)

