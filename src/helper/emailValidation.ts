const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function emailValidation(email:string){
    if(!emailRegex.test(email))return false
    return true
}