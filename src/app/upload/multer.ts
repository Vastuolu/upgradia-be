import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import multer from "multer"
import {v4 as idmaker} from 'uuid'
import { respond } from "../../helper/response"
import path from "path"
import fs from "fs/promises"
const prisma = new PrismaClient()
const pathFile = path.join(__dirname, '../../../../uploads');


export async function multipleUploads(filePrefix:string, problogId:number, numberOfFile:number, locate:string, req:Request, res:Response) {
    try {
        let functionSave
        if(locate === "project"){
            functionSave = saveFileProject
        }else if(locate === "blog"){
            functionSave = saveFileBlog
        }
        const upload = multer({storage:multer.diskStorage({
            destination: function (req, file, cb){
            cb(null, 'uploads/')
        },
        filename: async function (req, file, cb){
            cb(null, filePrefix + "_" + file.originalname)
            await functionSave(file.originalname, problogId, filePrefix)
        }}),
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

        const uploads = upload.array('image', numberOfFile);
        uploads(req, res, function (err) {
            if (err) {
                console.log(err)
                return {error:err}
            }
        });
        return null
} catch (error) {
 console.log(error)
 return error   
}
}

export async function saveFileProject(files: string, projectId: number, filePrefix:string){
    try{
           const file = await prisma.projectImages.create({
            data:{
                id: idmaker(),
                projectId: projectId,
                filename: (filePrefix+"_"+files)
            }
           })
           return {
            id:file.id,
            projectId: file.projectId,
            filename: file.filename
            }
    }catch(error){
        console.log(error)
        throw Error
    }
}

export async function saveFileBlog(fileName:string, blogId:number,filePrefix:string){
    try{
        const file = await prisma.blogImages.create({
            data: {
                id : idmaker(),
                blogId: blogId,
                filename: (filePrefix+"_"+fileName)
            }    
        })
        return {
            id:file.id,
            blogId: file.blogId,
            filename: file.filename
            }    
    }catch(error){
        throw Error
    }
}


export async function uploadValidateProject(req:Request, res:Response, next:NextFunction){
    try {
        const projectId = parseInt(req.params.id)
        if(!projectId) return respond(400, true, "No Project ID Included", null, res)
        const projectTemp = await prisma.project.findUnique({where:{id:projectId}})
        if(!projectTemp)return respond(404, true, "Project Not Found", null, res)
        return next()
    } catch (error) {
        console.log(error)
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



export async function deleteFileServer(fileNameProject:string):Promise<void> {
    try {
        const filePath = path.join(pathFile,fileNameProject)
        await fs.unlink(filePath)
        return null
    } catch (error) {
        console.log(error)
        return null
    }    
}