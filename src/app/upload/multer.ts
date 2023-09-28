import { PrismaClient } from "@prisma/client"
import multer from "multer"
import {v4 as idmaker} from 'uuid'
const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

export const upload = multer({storage:storage})


export async function saveFileProject(files: string, projectId: number){
    try{
           const file = await prisma.projectImages.create({
            data:{
                id: idmaker(),
                projectId: projectId,
                filename: (Date.now()+"_"+files)
            }
           })
           return file
    }catch(error){
        console.log(error)
        throw Error
    }
}


export async function saveFileBlog(fileName:string, blogId:number, ){
    try{
            const file = await prisma.blogImages.create({
                data: {
                    id : idmaker(),
                    blogId: blogId,
                    filename: (Date.now()+"_"+fileName)
                }    
            })
            return file    
    }catch(error){
        throw Error
    }
}