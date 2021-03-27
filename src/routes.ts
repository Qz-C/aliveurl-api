const express = require("express");
const pingController = require("./controllers/ping");
const usersController = require("./controllers/users");

import {  
    Router  
} from "express";

const route:Router = express.Router();

route.get("/ping", pingController.ping);
route.post("/users", usersController.create);

module.exports = route;
