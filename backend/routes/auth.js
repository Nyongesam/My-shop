const express=require("express");
const router=express.Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//REGISTER
router.post("/register",async(req,res)=>{
    const{name,email,password}=req.body;
    //Check if user already exists
    const emailExist=await User.findOne({email:email});
    const hashed=await bcrypt.hash(password,10);
    if(emailExist){
        return res.status(400).json({message:"Email already exists"});
    }
    const user=await User.create({
        name:name,
        email:email,
        password:hashed
    });
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.json({token:token});
});
//LOGIN
router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    //Check if user exists
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(400).json({message:"Email does not exist"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.json({token:token});
});
//LOGOUT
router.post("/logout",async(req,res)=>{
    res.json({message:"Logged out successfully"});
});
module.exports=router;