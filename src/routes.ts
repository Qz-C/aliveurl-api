const express = require("express");
const pingController = require("./controllers/ping");

import {  
    Router  
} from "express";

const route:Router = express.Router();

route.get("/ping", pingController.ping);

module.exports = route;
