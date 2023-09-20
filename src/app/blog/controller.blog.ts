import { PrismaClient } from "@prisma/client";
import { returnHandler as retHandler, returnHandler } from "../../helper/response";

const prisma = new PrismaClient()

export async function getBlogs() {
    try {
        const gettedBlog = await prisma.blog.findMany()
        return retHandler(200, false, "Get Blog Success", gettedBlog)
    } catch (error) {
        return retHandler(500, true, "Get Blog Error", {error:error})
    }
}

export async function getBlogByIt(id:number) {
    
}