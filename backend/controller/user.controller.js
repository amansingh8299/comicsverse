// import User from "../model/user.model.js";
// import bcryptjs from "bcryptjs";
// export const signup = async(req, res) => {
//     try {
//         const { fullname, email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const hashPassword = await bcryptjs.hash(password, 10);
//         const createdUser = new User({
//             fullname: fullname,
//             email: email,
//             password: hashPassword,
//         });
//         await createdUser.save();
//         res.status(201).json({
//             message: "User created successfully",
//             user: {
//                 _id: createdUser._id,
//                 fullname: createdUser.fullname,
//                 email: createdUser.email,
//             },
//         });
//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
// export const login = async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         const isMatch = await bcryptjs.compare(password, user.password);
//         if (!user || !isMatch) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         } else {
//             res.status(200).json({
//                 message: "Login successful",
//                 user: {
//                     _id: user._id,
//                     fullname: user.fullname,
//                     email: user.email,
//                 },
//             });
//         }
//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
 // Store in environment variables
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const createdUser = new User({
            fullname,
            email,
            password: hashPassword,
        });

        await createdUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET, { expiresIn: "7d" });

        // Set JWT token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Redirect to home page after signup
        res.status(201).json({
            message: "User created successfully. Redirecting to home...",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
            token,
            redirect: "/home", // Send redirect URL to frontend
        });

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

        // Set JWT token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
            token,
            redirect: "/home",
        });

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

