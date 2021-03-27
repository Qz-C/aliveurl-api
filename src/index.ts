import { 
    Application,
    Request,
    Response 
} from "express";


const db = require("./db/connection");
const express = require("express");
const routes = require("./routes");
const app:Application = express();
const PORT:number = 3333;

db.connect();
app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
