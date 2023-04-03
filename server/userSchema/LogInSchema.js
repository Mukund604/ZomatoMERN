const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const LogInSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        tokens : [
            {
                token : {
                    type : String,
                    required : true
                }
            }
        ]
    }
)

LogInSchema.methods.generateAuthAToken = async function(){
    try{
        let currToken = jwt.sign({_id  : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : currToken});
        await this.save();
        return currToken;
    }catch(err){
        console.log(err);
    }
}


const user = mongoose.model("LogInSchema", LogInSchema);
module.exports = user;