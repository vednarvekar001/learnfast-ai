import express from 'express';
import { getAIResponse, getUserChats, getSingleChat } from '../Controllers/ai.controller.js';
import checkAuth from '../Middlewares/auth.middleware.js';
import { get } from 'mongoose';

const router = express.Router();

// Post new message and get AI response
router.post('/get-response', checkAuth, express.json() ,getAIResponse);

// ✅ New route: Get chat history on login
router.get('/get-history', checkAuth, getUserChats);

router.get('/chat/:id', checkAuth, getSingleChat);

export default router;
