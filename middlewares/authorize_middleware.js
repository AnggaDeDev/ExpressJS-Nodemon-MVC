const jwt = require('jsonwebtoken');
const JWT_SECRET = 'undira';

const adminMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    console.log(user.roles)
    if (user.roles !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Proceed if the user is admin
    next();
  });
};

module.exports = adminMiddleware;
