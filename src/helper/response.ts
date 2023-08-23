import { Response } from "express"
export default function sendResponse(status_code: number = 200, message: string, data:object | null,res: Response){
    res.status(status_code).json({
        status_code: status_code,
        message: message,
        data: data
    })
}