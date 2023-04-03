const mongoose = require("mongoose");

const RestrauntsData = new mongoose.Schema(
    {
        restrauntName : {
            type : String,
            required : true
        },
        restrauntAddress : {
            type : String,
            required : true
        },
        restrauntPhoneNumber : {
            type : String,
            required : true
        },
        restrauntOwnerName : {
            type : String,
            required : true
        },
        restrauntOwnerPhone : {
            type : String,
            required : true
        },
        restrauntOwnerEmail : {
            type : String,
            required : true
        },

    }
)

const Restraunts = mongoose.model("Restraunt", RestrauntsData);
module.exports = Restraunts;