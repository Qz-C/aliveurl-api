import { AnyARecord } from "dns";
import { 
    Application,
    Request,
    Response 
} from "express";

const express = require("express");

const app:Application = express();

const PORT:number = 3333;

app.listen(PORT, () => {
    `SERVER RUNNING ON PORT ${PORT}\n`;
});

app.get('/', (req:Request,res:Response) => {
    res
        .status(200)   
        .send({"message": "Hello World"});
})