import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../lib/utils.js';
import {sendWelcomeEmail} from '../emails/emailHandler.js';
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