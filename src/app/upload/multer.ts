import { PrismaClient } from "@prisma/client"
import multer from "multer"
import path from 'path'
import {v4 as idmaker} from 'uuid'
import {returnHandler as retHandler} from '../../helper/response'
const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({ storage })


export async function saveFileProject(fileName:string, projectId:number, ){
    try{
            const file = await prisma.projectImages.create({
                data: {
                    id : idmaker(),
                    projectId: projectId,
                    filename: fileName
                }    
            })
            return retHandler(200, false, "Upload Image Succees", file)
    }catch(error){
        return retHandler(500, true, "Upload Image Error", {error:error})
    }
}


export async function saveFileBlog(fileName:string, blogId:number, ){
    try{
            const file = await prisma.blogImages.create({
                data: {
                    id : idmaker(),
                    blogId: blogId,
                    filename: fileName
                }    
            })
            return retHandler(200, false, "Upload Image Succees", file)
    }catch(error){
        return retHandler(500, true, "Upload Image Error", {error:error})
    }
}