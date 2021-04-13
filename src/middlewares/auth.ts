import { Response, Request, NextFunction } from "express";
import { VerifyErrors } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt || undefined;

    if (!token)
        return res.status(401).send({ "Error": "No token provided" });

    jwt.verify(token, process.env.SECRET_AUTH, (err: VerifyErrors | null, decoded: any) => {
        if (err)
            return res.status(401).send({ "Error": "Invalid token" });

        if ("email" in decoded) {
            req.authEmail = decoded.email;
            return next();
        } else
            if ("phone" in decoded) {
                req.authPhone = decoded.phone;
                return next();
            } else
                if ("_id" in decoded) {
                    req.authId = decoded.id;
                    return next();
                } else
                    return res.status(401).send({ "Error": "Invalid token" });
    })
}