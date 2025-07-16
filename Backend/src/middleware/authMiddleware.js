const { verifyToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Split 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded; // store user data for route access
  next();
};
