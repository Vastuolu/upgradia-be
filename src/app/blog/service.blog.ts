import { PrismaClient } from "@prisma/client";
import { returnHandler as retHandler } from "../../helper/response";
import { Zlib } from "zlib";

const prisma = new PrismaClient()

export async function getBlogs() {
    try {
        const gettedBlog = await prisma.blog.findMany()
        if(!gettedBlog || gettedBlog.length === 0) return retHandler(404, true, "Table Blog is empty", null)
        return retHandler(200, false, "Get Blog Success", gettedBlog)
    } catch (error) {
        return retHandler(500, true, "Get Blog Error", {error:error})
    }
}

export async function getBlogById(id:number) {
    try {
        const gettedBlog = await prisma.blog.findUnique({where:{id:id}})
        if(!gettedBlog) return retHandler(404, true, "Blog Not Found", null)
        return retHandler(200, false, "Get Blog Success", gettedBlog)
    } catch (error) {
        return retHandler(500, true, "Get Blog Error", {error: error})
    }
}

export async function createBlog(title:string, description:string, images:string, paragraph:string) {
    try {
        const createdBlog = await prisma.blog.create({
            data:{
                title: title,
                description:description,
                images: images,
                paragraph: paragraph
            }
        })
        return retHandler(200, false, "Create Blog Success", createdBlog)
    } catch (error) {
        return retHandler(500, true, "Create Blog Error", {error:error})
    }    
}

export async function updateBlog(id:number, title:string, description:string, images:string, paragraph:string) {
    try {
        const findBlog = await prisma.blog.findUnique({where:{id:id}})
        if(!findBlog) return retHandler(404, true, "Blog Not Found", null)
        const updatedBlog = await prisma.blog.update({
            where:{id:id}, data:{
                title: title,
                description:description,
                images:images,
                paragraph:paragraph
            }
        })
        return retHandler(200, false, "Update Blog Success", updatedBlog)
    } catch (error) {
        return retHandler(500, true, "Update Blog Error", {error:error})
    }
}

export async function deleteBlog(id:number) {
    try {
        const findBlog = await prisma.blog.findUnique({where:{id:id}})
        if(!findBlog) return retHandler(404, true, "Blog Not Found", null)
        await prisma.blog.delete({where:{id:id}})
        return retHandler(200, false, "Delete Blog Success", null)
    } catch (error) {
        return retHandler(500, true, "Delete Blog Error", {error:error})
    }
}