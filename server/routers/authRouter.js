const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: 'http://localhost:8000/login'

router.route('/').get((req, res) => {
  // if 'username' and 'password' exist - Gets checked in login.html script
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: req.params,
    }
  
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: 9000}); //Will expire after 2.5 hours
    
    res.send(token);
 } catch (err) {
  res.json(err);
 }
});


module.exports = router;