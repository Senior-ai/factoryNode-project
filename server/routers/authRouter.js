const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: 'http://localhost:8000/login'

router.route('/login').post((req, res) => {
  // if 'username' and 'password' exist - Gets checked in login.html script
    const userId = req.body.id; // find user's ID
    const ACCESS_SECRET_TOKEN = 'someKey';

    const accessToken = jwt.sign(
      { id: userId },
      ACCESS_SECRET_TOKEN,
      // { expiresIn: 7200 } // expires after 7200ms (2 hours)
    ); // Get Access Token
    res.json({ accessToken });
  

  res.status(401);
});

module.exports = router;