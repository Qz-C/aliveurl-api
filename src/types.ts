//User type
export interface User {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    tosAgreement: boolean
    createdAt?: Date
}

//User's type guard
export const instanceOfUser = (object: any): object is User => {
   return (
       "firstName" in object &&
       "lastName" in object &&
       "phone" in object &&
       "email" in object &&
       "password" in object &&
       "tosAgreement" in object
   );
}