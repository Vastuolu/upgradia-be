import { PrismaClient } from "@prisma/client";
import { returnHandler as retHandler } from "../../helper/response";
import path from 'path'

const prisma = new PrismaClient()

export async function getProjects(){
    try {
        const gettedProject = await prisma.project.findMany()
        if(!gettedProject || gettedProject.length === 0) return retHandler(404, true, "Table Project is empty", null)
        const gettedData: Array<object> = await Promise.all(
        gettedProject.map(async project => {
            const projectId:number = project.id
            const gettedFile = await prisma.projectImages.findMany({where:{projectId:projectId}})
            const mappedData = {
                id:projectId,
                title: project.title,
                url: project.title,
                images: gettedFile
            }
            return mappedData
        }))
        return retHandler(200, false, "Get Project Success", gettedData)
    } catch (error) {
        return retHandler(500, true, "Get Projects Error", {error: error})
    }
}

export async function getProjectById(id:number) {
    try {
        const gettedProject = await prisma.project.findUnique({where:{id:id}})
        if(!gettedProject) return retHandler(404, true, "Project Not Found", null)
        const projectId:number = gettedProject.id
        const gettedFile = await prisma.projectImages.findMany({where:{projectId:projectId}})
        const gettedData = {
            id:projectId,
            title: gettedProject.title,
            url: gettedProject.title,
            images: gettedFile
        }
        return retHandler(200, false, "Get Project Success", gettedData)
    } catch (error) {
        return retHandler(500, true, "Get Project Error",{error:error})
    }
}

export async function createProject(title:string, image:string, url:string) {
    try {
        const createdProject = await prisma.project.create({
            data:{
                title: title,
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



