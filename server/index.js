const mongoose = require('mongoose');
const express = require('express');
const app = express();
const user = require('./userSchema/LogInSchema')
const cors = require('cors');

//Cors
app.use(cors());

//Requiring databse Connection
require('../server/database/db');

//JsonExpress
app.use(express.json());

//Requiring router
app.use(require("./router/auth"))

//MiddleWare
const MiddleWare = (req, res, next) =>{
    console.log("Hello from middleWare");
    next();
}

//For Home page
app.get('/',(req, res)=>{
    res.send("Hello world from Backend");
})

//Server
app.listen(3008, ()=>{
    console.log("Server is running on port number 3003");
})