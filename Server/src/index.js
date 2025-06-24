import express from 'express';
import authRoutes from './Routes/auth.routes.js';
import uploadRoutes from './Routes/upload.routes.js';
import aiRoutes from './Routes/ai.route.js';
import connectDB from './Libraries/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rateLimit from 'express-rate-limit'; // <-- Only new addition

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Safety check for environment variables
if (!process.env.PORT || !process.env.OPENROUTER_API_KEY || !process.env.MONGODB_URI) {
  console.error("❌ Missing required environment variables (PORT, OPENROUTER_API_KEY, or MONGODB_URI)");
  process.exit(1);
}

const server = express();

// ✅ Middleware setup
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Rate limiting (only new code block)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
server.use('/api/', limiter); // <-- Applied to all API routes

// ✅ Static file serving
server.use('/uploads', express.static(path.resolve('uploads')));

// ✅ API routes
server.use('/api/auth', authRoutes);
server.use('/api', uploadRoutes);
server.use('/api/ai', aiRoutes);

// ✅ Optional: serve frontend in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, '../client/dist')));
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

// ✅ Start server after successful DB connection
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });