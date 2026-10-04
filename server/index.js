import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import { env } from './config/env.js';

const app = express();

app.use(cors({ origin: env.nodeEnv === 'production' ? process.env.CLIENT_URL : true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'CollegeFlow API is running.' });
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(env.port, () => {
  console.log(`CollegeFlow API listening on http://localhost:${env.port}`);
});

export default app;
