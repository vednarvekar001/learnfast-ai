import express from 'express';
import { login, logout, register, updateProfile } from '../Controllers/auth.controllers.js';
import checkAuth from '../Middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.put('/settings', checkAuth, updateProfile)

export default router;