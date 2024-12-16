const jwt = require('jsonwebtoken');

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user payload to request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied: Admins Only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
