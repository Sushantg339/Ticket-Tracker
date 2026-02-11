import {z} from "zod";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
export const signupController = async (req, res) => {
    try {
        const requiredBody = z.object({
            email : z.email(),
            password : z.string().min(6)
        })

        const parsed = requiredBody.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({
                message : "Invalid Input"
            })
        }
        const { email, password } = parsed.data

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({ email, password: hashedPassword });


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
        message: "Server error"
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const requiredBody = z.object({
            email: z.email(),
            password: z.string().min(6)
        });

        const parsed = requiredBody.safeParse(req.body);
            if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        const { email, password } = parsed.data;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({
            message: "User logged in successfully"
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getUser = async(req , res)=>{
    try {
        const userId = req.userId
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(401).json({
                msg : "unauthorized. login again"
            })
        }

        return res.status(200).json({
            user: {
                userId : user._id,
                email : user.email
            }
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
}