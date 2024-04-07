const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
name:{
    type: String,
    required:[true,"please add name"],
    trim:true
},
email:{
    typr:String,
    required:[true,"please add email"],
    unique:true,
    trim:true
},
password:{
    type:String,
    required:[true,"please add password"],
    min:6,
    max:64,
},
role:{
    type:String,
    default:'user'
}

},{timestamps:true}
);

module.exports=mongoose.models("user",userShema);