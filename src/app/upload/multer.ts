import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import multer from "multer"
import {v4 as idmaker} from 'uuid'
import { respond } from "../../helper/response"
import path from "path"
const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

export const upload = multer({storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
})

export async function uploadValidateProject(req:Request, res:Response, next:NextFunction){
    try {
        const projectId = parseInt(req.params.id)
        if(!projectId) return respond(400, true, "No Project ID Included", null, res)
        const projectTemp = await prisma.project.findUnique({where:{id:projectId}})
        if(!projectTemp)return respond(404, true, "Project Not Found", null, res)
        return next()
    } catch (error) {
        return respond(500, true, "Validate Error", {error:error}, res)
    }
}

export async function uploadValidateBlog(req:Request, res:Response, next:NextFunction){
    try {
        const blogId = parseInt(req.params.id)
        if(!blogId) return respond(400, true, "No Blog ID Included", null, res)
        const blogTemp = await prisma.blog.findUnique({where:{id:blogId}})
        if(!blogTemp)return respond(404, true, "Blog Not Found", null, res)
        return next()
    } catch (error) {
        return respond(500, true, "Validate Error", {error:error}, res)
    }
}

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


export async function saveFileBlog(fileName:string, blogId:number){
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