const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1h', // Token will expire in 1 hour
  };

  return jwt.sign(payload, secret, options);
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};