import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export async function login(req,res){

    
   try{
        const {email,password}= req.body;

    if(!email||!password){
        return res.status(400).json("Data Missing");
    }

    const isEmail= await user.findOne({"email":email});

    if(!isEmail){
        return res.status(404).json({"message":"email not registered"})
    }

    else if(!bcrypt.compareSync(password,isEmail.password)){
        return res.status(403).json({"message":"Wrong Password"})
    }
    else{
       
        
        const accessToken =jwt.sign({_id:isEmail._id},"secretKey");

        return res.status(200).json({
            "message":"Login Successfull",
            "User":{
                "userName":isEmail.userName,
                "email":isEmail.email
            },
            "token":accessToken
        });
    }
}
catch(err){
    return res.status(500).json(err.message);
}
}


export async function registerUser(req,res){

    try{
        const {userName,email,password}= req.body;

        
    if(!userName||!email||!password){
        return res.status(400).json("Data Missing");
    }

    const oldUser= await user.findOne({"email":email});

    if(oldUser){
       return res.status(400).json({message:"user with this email already exists"})
    } 
    else {

        const newUser= new user({
            "userName":userName,
            "email":email,
            "password":bcrypt.hashSync(password,10)
        });
        await newUser.save();

    return res.status(201).json({message:"Registeration Successfull"});
}
}
catch(err){
    return res.status(500).json(err.message);
}
}

