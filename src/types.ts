//User type
export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string | undefined,
    tosAgreement: boolean
    createdAt?: Date
    updatedAt?: Date
}

//User's type guard
export const instanceOfUser = (object: any): object is User => {
    return (
        "_id" in object &&
        "firstName" in object &&
        "lastName" in object &&
        "phone" in object &&
        "email" in object &&
        "password" in object &&
        "tosAgreement" in object
    );
}