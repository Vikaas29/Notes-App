import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// middleware to verify JWT login 
export async function checkLogin(req,res,next){

    const authHeader= req.headers["authorization"];

    // to check the header
    if(!authHeader){
            res.status(404);
        return res.json({"message":"Authorization Header Not Found"});
    }

    const token=authHeader && authHeader.split(" ")[1];

    jwt.verify(token,"secretKey",(err,user)=>{
        if(err){
            res.status(403);
            res.send("Invalid JWT token");
        }

       else {
        userModel.findById(user._id).then(data=>{req.user=data;next()});
       
    }
    });
}