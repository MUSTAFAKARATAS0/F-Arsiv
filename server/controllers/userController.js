const JWT = require('jsonwebtoken')
const { hash } = require('bcrypt');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel=require('../models/userModel')

//register 
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

//login
const loginController = async (req,res) => {
try {
    const {email, password} = req.body
    //validation
    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:'please provide email or password'
        })
    }
    //find user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(500).send({
            success:false,
            message:'user not found'
        })
    }
    //match password
    const match = await comparePassword(password, user.password)
    if(!match){
        return res.status(500).send({
            success:false,
            message:'invalid username or password'
        })
    }

    //TOKEN JWT
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
        expiresIn:'7d'
    });

    //undeinfed password
    user.password=undefined;
    res.status(200).send({
        success:true,
        message:'login successfully',
        token,
        user
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:'error in login api',
        error
    })
}
};

module.exports={registerController,loginController};