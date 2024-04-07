const { hash } = require('bcrypt');
const { hashPassword } = require('../helpers/authHelper');
const userModel=require('../models/userModel')
const registerController = async (req,res) => {
try {
    const{name,email,password}=req.body
    //validation
    if(!name){
        return res.status(400).send({
            success:false,
            message:'name is required' 
        })
    }
    if(!email){
        return res.status(400).send({
            success:false,
            message:'email is required' 
        })
    }
    if(!password || password.length < 6 ){
        return res.status(400).send({
            success:false,
            message:'password is required 6 character long' 
        })
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({email})
    if(exisitingUser){
         return res.status(500).send({
            success:false,
            message:'user alredy register with this email'
        });
    }
    //hashed password
    const hashedPassword = await hashPassword(password)

    //save user
    const user = await userModel({name,email,password:hashedPassword}).save();

    res.status(201).send({
        success:true,
        message:'registeration successfull please login'
    });

} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:'error in register api',
        error,
    });
}

};

module.exports={registerController};