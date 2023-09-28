import { Router, Request, Response, response } from 'express'
import { upload, saveFileBlog, saveFileProject} from './multer'
import { respond, returnHandler as retHandler } from '../../helper/response'  
import { type } from 'os'


export const FileRoutes = Router()

FileRoutes.post('/project', upload.array('image' , 3), async (req: Request, res: Response)=>{
    	console.log('here') 
        const files = req.files
        
        if(!files) return respond(304, true, "No image found", null, res)

        console.log(files?.length)
        // console.log(files.forEach)
        console.log(req.files)

        // const filename = files.
        const projectId = req.body.projectId
        const projectIdAsNumber = parseInt(projectId, 10);
        const filenames:string[] = []
        files.forEach(async(file:File[])=>{
            const value = file['originalname']
            // const data = await saveFileProject(value, projectId)
            // console.log(data)
            filenames.push(value)
        })
        return respond(200, false, "Ok", filenames, res)
        
    
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

