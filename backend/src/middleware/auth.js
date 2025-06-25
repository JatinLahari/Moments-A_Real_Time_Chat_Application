import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();
export const auth = async(req, res, next)=>{
    let {token} = req.cookies;
    try{
        if(!token) return res.status(401).json({message:"Unauthorized user -  No token found."});
        let decode = jwt.verify(token, process.env.THE_KEY_OF_SECRET);
        if(!decode) return res.status(401).json({message:"Unauthorized token!"});
        let user = await User.findById(decode.userId, {fullName:1,email:1,})
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}