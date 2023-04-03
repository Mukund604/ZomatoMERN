const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://Mukund:DL7CR4135@cluster0.syobmsr.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Database connected Successfully");
}).catch((err)=>{
    console.log("Some error occured");
})