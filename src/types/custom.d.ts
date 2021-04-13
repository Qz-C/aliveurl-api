declare namespace Express {
    export interface Request {
       authEmail?: string,
       authPhone?: string,
       authId?: string
    }
 }