import { PrismaClient } from "@prisma/client";
import { returnHandler as retHandler } from "../../helper/response";
import { deleteFileServer } from "../upload/multer";

const prisma = new PrismaClient()

export async function getBlogs() {
    try {
        const gettedBlog = await prisma.blog.findMany()
        if(!gettedBlog || gettedBlog.length === 0) return retHandler(404, true, "Table Blog is empty", null)
        const gettedData: Array<object> = await Promise.all(
            gettedBlog.map(async blog => {
                const blogId:number = blog.id
                const gettedFile = await prisma.blogImages.findMany({where:{blogId:blogId}})
                const mappedData = {
                    id:blogId,
                    title: blog.title,
                    description: blog.description,
                    paragraph: blog.paragraph,
                    images: gettedFile
                }
                return mappedData
            }))
        return retHandler(200, false, "Get Blog Success", gettedData)
    } catch (error) {
        return retHandler(500, true, "Get Blog Error", {error:error})
    }
}

export async function getBlogById(id:number) {
    try {
        const gettedBlog = await prisma.blog.findUnique({where:{id:id}})
        if(!gettedBlog) return retHandler(404, true, "Blog Not Found", null)
        const blogId:number = gettedBlog.id
        const gettedFile = await prisma.blogImages.findMany({where:{blogId:blogId}})
        const gettedData = {
            id:blogId,
            title: gettedBlog.title,
            description: gettedBlog.description,
            paragraph: gettedBlog.paragraph,
            images: gettedFile
        }
        return retHandler(200, false, "Get Blog Success", gettedData)
    } catch (error) {
        return retHandler(500, true, "Get Blog Error", {error: error})
    }
}

export async function createBlog(title:string, description:string, paragraph:string) {
    try {
        const createdBlog = await prisma.blog.create({
            data:{
                title: title,
                description:description,
                paragraph: paragraph
            }
        })
        return retHandler(200, false, "Create Blog Success", createdBlog)
    } catch (error) {
        console.log(error)
        return retHandler(500, true, "Create Blog Error", {error:error})
    }    
}

export async function updateBlog(id:number, title:string, description:string, paragraph:string) {
    try {
        const findBlog = await prisma.blog.findUnique({where:{id:id}})
        if(!findBlog) return retHandler(404, true, "Blog Not Found", null)
        const updatedBlog = await prisma.blog.update({
            where:{id:id}, data:{
                title: title,
                description:description,
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
        const gettedFile = await prisma.blogImages.findMany({where:{blogId:id}})
        const arrayedData = await gettedFile.map(async (project) => {
            return project.filename
        });
        const lengthFile:number = arrayedData.length    
        for(var i = 0; lengthFile > i; i++){
            const filename = await arrayedData[i]
            await deleteFileServer(filename)
        };
        await prisma.blogImages.deleteMany({where:{blogId:id}})
        await prisma.blog.delete({where:{id:id}})
        return retHandler(200, false, "Delete Blog Success", null)
    } catch (error) {
        return retHandler(500, true, "Delete Blog Error", {error:error})
    }
}