const express = require('express');
const jwt = require('jsonwebtoken');
const userBLL = require('../BLL/userBLL')
const router = express.Router();

// Entry Point: 'http://localhost:8000/users/'

router.route('/').get( async(req, res) => {
    const users = await userBLL.getAllUsers();
    res.json(users);
});

// Get user By ID
router.route('/:id').get(async (req, res) => {
    try {
    const { id } = req.params;
    const user = await userBLL.getUserById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
  });
    
  // Update a user
  router.route('/:id').put(async (req, res) => {
    try {
    const { id } = req.params;
    const obj = req.body;
    const result = await userBLL.updateUser(id, obj);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  

module.exports = router;