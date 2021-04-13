const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


export const hash = async (password:String):Promise<string> => {
    return (await bcrypt.hash(password, 10));
}

export const genarateToken = (params:any, timeout:number):string => {
    return jwt.sign(params, process.env.SECRET_AUTH, {
        expiresIn: timeout
    })
}