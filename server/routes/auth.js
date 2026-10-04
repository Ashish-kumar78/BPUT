import express from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { findUserByEmail, dashboardData } from '../data/mockData.js';
import { authenticate, issueToken } from '../middleware/auth.js';

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Invalid login payload.' });
  }

  const { email, password } = parsed.data;
  const user = findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Account not found.' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ success: false, message: 'Invalid password.' });
  }

  const token = issueToken(user);

  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
});

router.get('/me', authenticate, (req, res) => {
  return res.json({ success: true, user: req.user });
});

router.get('/dashboard', authenticate, (req, res) => {
  const roleDashboard = dashboardData[req.user.role] || dashboardData.student;
  return res.json({ success: true, data: roleDashboard });
});

router.post('/logout', (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
