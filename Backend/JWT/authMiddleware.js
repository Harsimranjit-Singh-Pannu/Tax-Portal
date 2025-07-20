const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token exists in DB (i.e., not revoked)
    const tokenExists = await Token.findOne({ token });
    if (!tokenExists) {
      return res.status(401).json({ msg: 'Token revoked or invalid' });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;
