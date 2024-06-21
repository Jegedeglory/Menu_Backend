import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserModel } from '../models/users.schema';
import { hashPassword } from '../utils/hashPassword';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret in a real application

// Registration Route
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new UserModel({ email, password: hashedPassword, name });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
