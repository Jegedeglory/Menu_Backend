import express from 'express';
import authRoutes from './auth';

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

export default router;