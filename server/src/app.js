// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import bugRoutes from './routes/bugRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    `<h2>Welcome</h2><p>Please <a href="/api/auth/login">login</a> or <a href="/api/auth/register">register</a>.</p>`
  );
});

app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);

app.use(errorHandler);

export default app;
