import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { hasPermission } from '../utils/rbac.js';
import { findUserByEmail } from '../data/mockData.js';

export function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = findUserByEmail(decoded.email);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is inactive or unknown.' });
    }

    req.user = { ...user, passwordHash: undefined };
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

export function authorize(requiredPermission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    if (!hasPermission(req.user.role, requiredPermission)) {
      return res.status(403).json({ success: false, message: 'Permission denied.' });
    }

    next();
  };
}

export function issueToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}
