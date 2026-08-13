import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import crypto from "node:crypto";

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

// Email validation
const isValidEmail = (email) => {
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
const isValidPassword = (password) => {
    // At least 8 characters// At least one uppercase// At least one lowercase// At least one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};

// Register
export const register = async (req, res) => {
    try {
        const {username,email,password} = req.body;
        // Required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required."
            });
        }
        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();
        // Validate email
        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                message: "Invalid email address."
            });
        }
        // Validate password
        if (!isValidPassword(password)) {
            return res.status(400).json({
                message:"Password must be at least 8 characters and contain an uppercase letter, a lowercase letter and a number."
            });
        }
        // Check existing user
        const existingUser = await User.findOne({
                email: normalizedEmail});
        if (existingUser) {
            return res.status(400).json({message: "Email already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = await User.create({
            username: username.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });
        // Response
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Register error:",error);
        res.status(500).json({message: "Internal server error"
        });
    }
};
// Login
export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        // Required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }
        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();
        // Find user
        const user = await User.findOne({email: normalizedEmail});
        // Invalid login
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }
        // Check password
        const isMatch = await bcrypt.compare(
                password,
                user.password
            );
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });

        }
        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        // Response
        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Login error:",error);
        res.status(500).json({message: "Internal server error"});
    }

};

export const googleLogin = async (req, res) => {
    try {
                console.log("===== GOOGLE LOGIN START =====");

        const { credential } = req.body;
          console.log(
            "Credential received:",
            !!credential
        );
        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required."
            });
        }
        console.log("START VERIFY GOOGLE TOKEN");

        // Verify Google ID token
        const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience:process.env.GOOGLE_CLIENT_ID
            });
        console.log("GOOGLE TOKEN VERIFIED");

        const payload = ticket.getPayload();
                console.log("GOOGLE PAYLOAD:", payload);

        const {sub,email,name,email_verified} = payload;
        if (!email || !email_verified) {
            return res.status(401).json({
                message:"Google account could not be verified."
            });}

        // Find existing user
        let user = await User.findOne({email: email.toLowerCase()});

        // Create new user
        if (!user) {user = await User.create({
                username:name || email.split("@")[0],
                email:email.toLowerCase(),
                password:await bcrypt.hash(
                        crypto.randomUUID(),10
                    )
            });
        }

        // Generate YOUR JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d"});
        console.log("GOOGLE LOGIN SUCCESS");

        res.json({
            message: "Google login successful",
            token
        });

    } catch (error) {
        console.error("Google login error:",error);
        res.status(401).json({
            message:"Google authentication failed."
        });
    }
};

