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


export async function saveFile(fileName:string, database:string, problogId:number, ){
    try{
        if(database === "project"){
            const file = await prisma.projectImages.create({
                data: {
                    id : idmaker(),
                    projectId: problogId,
                    filename: fileName
                    
                }    
            })
            return retHandler(200, false, "Upload Image Succees", file)
        }else if(database === "blog"){
            const file = await prisma.blogImages.create({
                data: {
                    id : idmaker(),
                    blogId: problogId,
                    filename: fileName
                }    
            })
            return retHandler(200, false, "Upload Image Succees", file)
        }
    }catch(error){
        retHandler(500, true, "Upload Image Error", {error:error})
    }
}
