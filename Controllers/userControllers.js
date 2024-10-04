const users= require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//
exports.register = async (req,res)=>{
    console.log("inside user register controller");
    const{username,email,password} = req.body;
    //check emailid prresent or not
    try {
        const existingUser = await users.findOne({email:email})
        if(existingUser){
            res.status(400).json("Account already exists")
        }
        else{
            console.log("user not exist");
            const newUser = new users({
                username:username,
                email:email,
                password:password,
                github:"",
                linkedin:"",
                profile:""
            });
            await newUser.save();
            res.status(200).json("user registered successfully")
            
        }
    }
    catch(err){
        res.status(401).json("Register request failed due to",err)
    }
    
}
exports.login = async(req,res)=>{
    console.log("inside login controller");
    const {email,password} = req.body;
        const existingUser = await users.findOne({email:email,password:password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"userpwd123");
            console.log(token);
            res.status(200).json(
                {
                    data:existingUser,
                    token:token
                }
            )
        }
        else{
            res.status(401).json("invalid Email or password")
            }
        
}

exports.getUserDetails = (req,res)=>{
    res.status(200).json("inside get userderails controller")
}