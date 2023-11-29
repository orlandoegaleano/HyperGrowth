const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.get('/search', async (req, res) => {
    const user = await User.find({ userId: req.user._id });
  
    res.send(user);
  });