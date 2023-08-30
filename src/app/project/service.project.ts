import { PrismaClient } from "@prisma/client";
import {ProjectInterface} from './interfaces.project'

const prisma = new PrismaClient

export async function getProjects(){
    try {
        const data = await prisma.project.findMany()
        return data
    } catch (error) {
        throw Error('Server Error (500)')
    }
}

export async function getProjectById(id:number) {
    try {
        const data = await prisma.project.findUnique({where:{id:id}})
        return data
        if(!data) return false
    } catch (error) {
        throw Error('Server Error')
    }
}