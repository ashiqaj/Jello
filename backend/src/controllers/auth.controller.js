import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../lib/utils.js';
import {sendWelcomeEmail} from '../emails/emailHandler.js';
import cloudinary from '../lib/cloudinary.js';
import 'dotenv/config';
export const signup = async(req,res)=>{
    const {fullName, email, password} = req.body;

    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({messege : "All fields are required"});
        }
        if(password.length<6) {
            return res.status(400).json({messege : "Password must be atleast 6 characters"});
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({messege : "Invalid email format"});
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({messege : "Email already exists"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });
        if(newUser) {
            await newUser.save();
            generateToken(newUser._id,res);

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic 
            });

            try {
                await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.CLIENT_URL);
            }catch(error) {
                console.log("failed to send Welcome email ",error);
            }
        }
        else {
            res.status(400).json({messege : "Invalid user data"});
        }
    }
    catch(error) {
        console.log("Error in signup controller:",error);
        res.status(500).json({messege:"Internal server error"})
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password) {
        return res.status(400).json({messege:"Email and password are required"});
    }
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({messege:"Invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({messege:"Invalid credentials"});
        }
        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });
    }
    catch(error) {
        console.error("Error in login controller");
        res.status(500).json({messege:"Internel server error"});
    }
}
export const logout = (_,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({messege:"Logged out successfully"});
}

export const updateProfile = async(req,res)=> {
    try {
        const {profilePic} = req.body;
        if(!profilePic) return res.status(400).json({messege:"Profile pic ids required"});
        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndupdate(
            userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile:",error);
        res.status(500).json({messege:"Internel server error"});
    }
}