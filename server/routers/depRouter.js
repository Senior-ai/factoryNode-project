const express = require('express');
const jwt = require('jsonwebtoken');
const depBLL = require('../BLL/depBLL')

const router = express.Router();

// Entry Point: 'http://localhost:8000/departments/'

router.route('/').get( async(req, res) => {
    try {
    const deps = await depBLL.getAllDepartments();
    //console.log(deps);
    const jwt = req.body;
    res.json(deps);
    res.status(200);
    } catch (error) {
        res.json(error);
    }
    
});

// Get department By ID
router.route('/:id').get(async (req, res) => {
    try {
    const { id } = req.params;
    const Dep = await depBLL.getDepartmentById(id);
    res.json(Dep);
  } catch (error) {
    res.json(error);
  }
  });
  
  // Add a dep
  router.route('/').post(async (req, res) => {
    try {
    const obj = req.body;
    const result = await depBLL.addDepartment(obj);
    const depId = result.id;
    res.json({department: result.department, depId: depId});
    } catch (error) {
      res.json(error);
    }
  });
  
  // Update a dep
  router.route('/:id').put(async (req, res) => {
    try {
    const { id } = req.params;
    const obj = req.body;
    const result = await depBLL.updateDepartment(id, obj);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  
  // Delete a movie
  router.route('/:id').delete(async (req, res) => {
    try {
    const { id } = req.params;
    const result = await depBLL.deleteDepartment(id);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;