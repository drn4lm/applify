import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

/*--ENDPOINT: Create a new user in the DB--*/
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({message: "Email already exists."});
        }
        const newUser = await User.create({ name, email, password });
        
        res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email });
    } catch (error) {
        res.status(500).json({ errorMessage:error.message })
    }
};

/*--ENDPOINT: Login an existing user and assigning them a JWT--*/
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required." });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Email could not be found." });
        }
        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({ message: "Password is incorrect." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ errorMessage:error.message })
    }
};

/*--ENDPOINT: Logout a client (client-side only)--*/
export const logout = async(res) => {
    res.status(200).json({ message: "Logged out." })
};
