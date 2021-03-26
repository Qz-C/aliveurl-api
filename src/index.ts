import { 
    Application,
    Request,
    Response 
} from "express";

const express = require("express");
const routes = require("./routes");
const app:Application = express();
const PORT:number = 3333;

app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}\n`);
});
