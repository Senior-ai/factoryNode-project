const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: 'http://localhost:8000/login'

router.route('/').post((req, res) => {
  // if 'username' and 'password' exist - Gets checked in login.html script
    let jwtSecretKey = `YEAH`;
    let data = {
      time: new Date(),
      userId: req.body,
    }
    
    //console.log(jwtSecretKey);
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: 9000}); //Will expire after 2.5 hours
    res.json({token});
});

module.exports = router;