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
    if(!password || password,length<6){
        return res.status(400).send({
            success:false,
            message:'password is required 6 character long' 
        })
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({email})
    if(exisitingUser){
        ReadableStreamBYOBRequest.res.status(500).send({
            success:false,
            message:'user alredy register with this email'
        })
    }



} catch (error) {
    console.log(error)
}

};

module.export={registerController};