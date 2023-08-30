import { Response } from "express"
export function respond( status_code: number = 200, isError:boolean, message: string, data:object | null,res: Response){
    res.status(status_code).json({
        status_code: status_code,
        isError:isError,
        message: message,
        data: data,
    })
}

export function returnHandler(status: number, isError:boolean , message: string, data:object | null){
    return{
        status: status,
        isError: isError,
        message: message,
        data: data,
    }
}