const express = require('express');
const jwt = require('jsonwebtoken');
const empBLL = require('../BLL/empBLL')

const router = express.Router();

// Entry Point: 'http://localhost:8000/empartments/'

router.route('/').get( async(req, res) => {
    try {
    const emps = await empBLL.getAllEmployees();
    const jwt = req.body;
    res.json(emps);
    res.status(200);
    } catch (error) {
        res.json(error);
    }
    
});

// Get empartment By ID
router.route('/:id').get(async (req, res) => {
    try {
    const { id } = req.params;
    const emp = await empBLL.getEmployeeById(id);
    res.json(emp);
  } catch (error) {
    res.json(error);
  }
  });
  
  // Add a emp
  router.route('/').post(async (req, res) => {
    try {
    const obj = req.body;
    const result = await empBLL.addEmployee(obj);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  
  // Update a emp
  router.route('/:id').put(async (req, res) => {
    try {
    const { id } = req.params;
    const obj = req.body;
    const result = await empBLL.updateEmployee(id, obj);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  
  // Delete a movie
  router.route('/:id').delete(async (req, res) => {
    try {
    const { id } = req.params;
    const result = await empBLL.deleteEmployee(id);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;