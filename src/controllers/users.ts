import {
    Request,
    Response
} from "express";

import { User } from "../types";
import userModel from "../models/user";
import { send } from "node:process";

module.exports = {
    async create(req: Request, res: Response) {
            const data:User = req.body;
            data.createdAt = new Date;
        
            const user = new userModel(data);
            user.save( (error:any) => {
                if(error){
                    console.warn(error);
                }
            })    

            res.status(200).send(data);
    }
}
