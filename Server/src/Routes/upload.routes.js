import express from 'express';
import checkAuth from '../Middlewares/auth.middleware.js';
import upload from '../Libraries/multer.js';
import { uploadHandler, fetch } from '../Controllers/upload.controller.js';

const router = express.Router();

router.post('/upload', checkAuth, upload.single('file'), uploadHandler)
router.get('/my-files', checkAuth, fetch);

export default router;
// This route is protected by the checkAuth middleware, which ensures that only authenticated users can upload files.
