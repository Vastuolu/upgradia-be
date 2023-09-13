import { PrismaClient } from "@prisma/client";
import {ProjectInterface} from './interfaces.project'
import { returnHandler as retHandler } from "../../helper/response";
import { v4 as idmaker } from "uuid";

const prisma = new PrismaClient()

export async function getProjects(){
    try {
        const data = await prisma.project.findMany()
        return retHandler(200, false, "Get Project Success", data)
    } catch (error) {
        return retHandler(500, true, "Get Projects Error", {error: error})
    }
}

export async function getProjectById(id:number) {
    try {
        const data = await prisma.project.findUnique({where:{id:id}})
        if(!data) return retHandler(404, true, "Project Not Found", null)
        return retHandler(200, false, "Get Project Success", data)
    } catch (error) {
        return retHandler(500, true, "Get Project Error",{error:error})
    }
}

export async function createProject(title:string, image:string, url:string) {
    try {
        const createdProject = await prisma.project.create({
            data:{
                title: title,
                image: image,
                url: url}
        })
        return retHandler(200, false, "Create Project Success", createdProject)
    } catch (error) {
        return retHandler(500, true, "Create Project Error", {error:error})        
    }    
}

export async function updateProject(id:number, title:string, image:string, url:string) {
    try {
        const findProject = await prisma.project.findUnique({where:{id:id}})
        if(!findProject) return retHandler(404, true, "Project Not Found", null)
        const updatedProject = await prisma.project.update({
            where:{id:id}, data:{
                title:title,
                image:image,
                url:url
            }
        })
        return retHandler(200, false, "Update Project Success", updatedProject)
    } catch (error) {
        return retHandler(500, true, "Update Project Error", {error: error})
    }
}

export async function deleteProject(id:number) {
    try {
        const findUser = await prisma.project.findUnique({where:{id:id}})
        if(!findUser) return retHandler(404, true, "Project Not Found", null)
        await prisma.project.delete({where:{id:id}})
        return retHandler(200, false, "Delete Project Success", null)
    } catch (error) {
        return retHandler(500, true, "Delete Project Error", {error:error})
    }
}