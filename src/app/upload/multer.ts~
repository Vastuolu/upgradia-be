import { PrismaClient } from "@prisma/client"
import { v4 as idMaker } from "uuid"
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({ storage })


export async function saveFile(filepath:string){
    try{
    	const file = await prisma.file.create({
	    data: {
	        filename: path.basename(filepath),
		path: filepath
	    }
	})

	return filepath
    }catch(error){
        return null
    }
}
