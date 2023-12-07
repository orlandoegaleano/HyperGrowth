const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../../../config'); 

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');

  console.log('Token:', token);
  console.log('Config Secret Key:', config.secretKey);

  jwt.verify(token, config.secretKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    console.log('User ID from Token:', userId);

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).send({ error: 'User not found.' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(500).send({ error: 'Server error.' });
    }
  });
};
