import { Router, Request, Response } from 'express'
import { upload, saveFile } from './multer'
import { returnHandler as retHandler } from '../../helper/response'  


export const FileRoutes = Router()

FileRoutes.post('/', upload.single('image'), async (req: Request, res: Response)=>{
    try{
    	if(!req.file){return retHandler(500, true, "There Is No Files", null)}
	const filepath = req.file.path
	const newFile = await saveFile(filepath)
    }catch(error){
       return null
    }
}
