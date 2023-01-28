const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: 'http://localhost:8000/auth'

router.route('/login').post((req, res) => {
  const { username, password } = req.body;

  // if 'username' and 'password' exist in DB
  if (true) {
    const userId = 'someId'; // find user's ID
    const ACCESS_SECRET_TOKEN = 'someKey';

    const accessToken = jwt.sign(
      { id: userId },
      ACCESS_SECRET_TOKEN,
      // { expiresIn: 7200 } // expires after 7200ms (2 hours)
    ); // Get Access Token
    res.json({ accessToken });
  }

  res.status(401); // Unauthorized
});

module.exports = router;