import {Request, Response} from 'express'
import {respond} from '../../helper/response'
import { createBlog, deleteBlog, updateBlog, getBlogById, getBlogs } from './service.blog'

export async function getMethod(req:Request, res:Response) {
    const {data, message, status, isError} = await getBlogs()
    return respond(status,isError, message, data, res)
}

export async function getMethodId(req:Request, res:Response) {
    const {data, message, status, isError} = await getBlogById(parseInt(req.params.id))
    return respond(status,isError, message, data, res)
}

export async function postMethod(req:Request, res:Response) {
    const {title, description, paragraph} = req.body
    if(!title||!description||!paragraph){
        return respond(400, true, "Some Fields are Still Empty", null, res)
    }
    const {data, message, status, isError} = await createBlog(title,description,paragraph)
    return respond(status,isError, message, data, res)
}

export async function putMethod(req:Request, res:Response) {
    const id = parseInt(req.params.id)
    const {title:nullTitle, description:nullDescription, paragraph:nullParagraph} = req.body
    let title, description, paragraph
    if(nullTitle) title = nullTitle
    if(nullDescription) description = nullDescription
    if(paragraph) paragraph = nullParagraph
    const {data, message, status, isError} = await updateBlog(id, title, description,paragraph)
    return respond(status,isError, message, data, res)
}

export async function deleteMethod(req:Request, res:Response) {
    const {data, message, status, isError} = await deleteBlog(parseInt(req.params.id))
    return respond(status,isError, message, data, res)
}