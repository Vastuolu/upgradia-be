import { Router, Request, Response, response } from 'express'
import { upload, saveFileBlog, saveFileProject} from './multer'
import { respond, returnHandler as retHandler } from '../../helper/response'  


export const FileRoutes = Router()

FileRoutes.post('/project', upload.array('image' , 3), async (req: Request, res: Response)=>{
    	if(!req.file){return retHandler(500, true, "There Is No Files", null)}
        console.log(req.file)
        return respond(200, false, "bla bla", null, res)
	// const fileName = req.file.originalname       
    // const id:number = parseInt(req.body.projectId)
	// const {data,isError,message,status} = await saveFileProject(fileName, id)
    // return respond(status,isError, message, data, res)
}
)

FileRoutes.post('/blog', upload.array('image', 3), async (req: Request, res: Response)=>{
    if(!req.file){return respond(500, true, "There Is No Files", null ,res)}
	const fileName = req.file.originalname
    const id : number= parseInt(req.body.blogId)
	const {data, isError, message, status} = await saveFileBlog(fileName, id)
    return respond(status,isError, message, data, res)
    }
)

