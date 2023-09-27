import { Router, Request, Response, response } from 'express'
import { upload, saveFile } from './multer'
import { respond, returnHandler as retHandler } from '../../helper/response'  


export const FileRoutes = Router()

FileRoutes.post('/project', upload.single('image'), async (req: Request, res: Response)=>{
    try{
    	if(!req.file){return retHandler(500, true, "There Is No Files", null)}
    console.log(res.send("Image Uploaded"))
	const fileName = req.file.originalname
	const tempik = await saveFile(fileName, "project", req.body.projectId)
    
    }catch(error){
       return console.log(error)
    }
}
)

FileRoutes.post('/blog', upload.single('image'), async (req: Request, res: Response)=>{
    try{
    	if(!req.file){return retHandler(500, true, "There Is No Files", null)}
    console.log(res.send("Image Uploaded"))
	const fileName = req.file.originalname
	const tempik = await saveFile(fileName, "project", req.body.blogId)
    
    }catch(error){
       return console.log(error)
    }
}
)

