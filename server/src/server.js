// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import bugRoutes from './routes/bugRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);

// Error handler
app.use(errorHandler);

// Static file serving (React frontend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Fallback for SPA routes (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
