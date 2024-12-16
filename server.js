const express = require('express');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const logger = require('./middlewares/logger');
const { authMiddleware } = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const users = [
  { username: 'admin@kookieskitchen.com', password: 'admin123', role: 'admin' },
  { username: 'user@kookieskitchen.com', password: 'user123', role: 'user' },
  { username: 'user2@kookieskitchen.com', password: 'user2123', role: 'user' },

];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Protected route example
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
