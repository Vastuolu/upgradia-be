import * as bcrypt from 'bcrypt'

export function dehashed(password:string, hashedPass:string){
    return bcrypt.compare(password, hashedPass)
}

export async function hashing(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
