import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

export const checkAuth = async(request,response,next)=>{
    try {
        return response.status(200).json(request.user);
    } catch (error) {
        console.log("Error in CheckAuth controller", error.message);
        return response.status(500).json({error:"Internal Server Error"});
    }
}
// profile updation
export const updateProfile = async(req,res,next)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic) return res.status(400).json({message:"Profile Pic is required."});
        const uploadProfile = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadProfile.secure_url},{new:true});
        return res.status(200).json(updatedUser);
    } 
    catch (err) {
        console.log("Profile updation error", err);
        return res.status(500).json({error:"Internal Server Error"});    
    }
}
// get user profile
export const profile = async(req, res, next)=>{
    try{
        let id = req.user.userId;
        if(!id) return res.status(404).json({message:"Please login with your account!"});

        let userProfile = await User.findById(id, {fullName:true, email:true, profilePic: true});
        if(!userProfile) return res.status(404).json({message:"User not found!"});

        return res.status(200).json({message:"User Profile found!", userProfile});
    }
    catch(err){
        console.log("Failed to get user profile ", err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}
// sign up 
export const userSignUp = async(req, res, next)=>{
    const {email, fullName, password} = req.body;
    try{
        let valid = validationResult(req);
        if(!valid.isEmpty()) return res.status(404).json({errorMessages: valid.array()});

        const user = await User.findOne({where:{email}});
        if(user) return res.status(400).json({message:"Email Already exists."});

        let salt = bcrypt.genSaltSync(15);
        const hashedPassword = bcrypt.hashSync(password.toString(), salt);

        const newUser = new User({email,fullName, password: hashedPassword});
        await newUser.save();
        return res.status(200).json({message:"Sign Up Successful", newUser});
    }
    catch(err){
        console.log("Error in Sign up" , err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}
// login
export const userLogin = async(req, res, next)=>{
    let {email, password} = req.body;
    try{
        let check = validationResult(req);
        if(!check.isEmpty()) return res.status(404).json({errorMessages: check.array()});
        let findUser = await User.findOne({email});
        if(findUser){
            let decryptPassword = await bcrypt.compare(password, findUser.password);
            if(decryptPassword){
            res.cookie("token", generateToken(findUser._id || findUser.id),
            {
                maxAge: 15*24*60*60*1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development"
            })
                return res.status(200).json({message:"Sign In Successful!", Name: findUser.fullName});
            }
            else{
                return res.status(401).json({message:"Invalid Credentials!"});
            }
        }
        return res.status(404).json({message:"User not found!"});
    }
    catch(err){
        console.log("Sign in error...", err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}; 
// generating token
export const generateToken = (userId)=>{
    let payload = {userId: userId};
    const token = jwt.sign(payload, process.env.THE_KEY_OF_SECRET, {expiresIn: "15d"});
    return token;
};
// logout
export const logout = (req,res,next)=>{
    res.clearCookie("token");
    return res.status(200).json({message:"Logout Successfully!"});
};
