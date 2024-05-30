const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function authMiddleware(allowedRoles) {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
      req.user = decoded;

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};
