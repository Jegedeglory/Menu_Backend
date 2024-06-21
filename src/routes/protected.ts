import express from 'express';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hello user with ID: ${req.user}` });
});

export default router;