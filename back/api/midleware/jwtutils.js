// ./back/api/middlewares/jwtUtils.js

const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    // You can add more user properties here
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1h', // Token will expire in 1 hour
  };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  generateToken,
};