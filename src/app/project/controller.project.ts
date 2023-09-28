import {Request, Response} from 'express'
import {respond} from '../../helper/response'
import { getProjectById, getProjects, createProject, updateProject, deleteProject} from './service.project'

export async function getMethod(req:Request, res:Response) {
    const {data, message, status, isError} = await getProjects()
    return respond(status,isError, message, data, res)
}

export async function getMethodId(req:Request, res:Response) {
    const {data, message, status, isError} = await getProjectById(parseInt(req.params.id))
    return respond(status,isError, message, data, res)
}

export async function postMethod(req:Request, res:Response) {
    const {title, image, url} = req.body
    if(!title||!image||!url){
        return respond(400, true, "Some Fields are Still Empty", null, res)
    }
    const {data, message, status, isError} = await createProject(title, image, url)
    return respond(status,isError, message, data, res)
}

export async function putMethod(req:Request, res:Response) {
    const id = parseInt(req.params.id)
    const {title:nullTitle, image:nullImage, url:nullUrl} = req.body
    let title, image, url
    if(nullTitle) title = nullTitle
    if(nullImage) image = nullImage
    if(nullUrl) url = nullUrl
    // const inputData = {
    //    id,title, image, url
    // }
    const {data, message, status, isError} = await updateProject(id, title, image, url)
    return respond(status,isError, message, data, res)
}

export async function deleteMethod(req:Request, res:Response) {
    const {data, message, status, isError} = await deleteProject(parseInt(req.params.id))
    return respond(status,isError, message, data, res)
}

