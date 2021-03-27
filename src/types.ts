export interface User{
    firstName: String,
    lastName: String,
    phone:String,
    email: String,
    password: String,
    tosAgreement: Boolean
    createdAt?:Date
}