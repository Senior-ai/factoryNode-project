const express = require('express');
const jwt = require('jsonwebtoken');
const shiftBLL = require('../BLL/shiftBLL')

const router = express.Router();

// Entry Point: 'http://localhost:8000/shifts/'

router.route('/').get( async(req, res) => {
    try {
    const shifts = await shiftBLL.getAllShifts();
    const jwt = req.body;
    res.json(shifts);
    res.status(200);
    } catch (error) {
        res.json(error);
    }
});

// Get Shift By ID
router.route('/:id').get(async (req, res) => {
    try {
    const { id } = req.params;
    const shift = await shiftBLL.getShiftById(id);
    res.json(shift);
  } catch (error) {
    res.json(error);
  }
  });
  
  // Add a shift
  router.route('/').post(async (req, res) => {
    try {
    const obj = req.body;
    const result = await shiftBLL.addShift(obj);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  
  // Update a shift
  router.route('/:id').put(async (req, res) => {
    try {
    const { id } = req.params;
    const obj = req.body;
    const result = await shiftBLL.updateShift(id, obj);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  
  // Delete a movie
  router.route('/:id').delete(async (req, res) => {
    try {
    const { id } = req.params;
    const result = await shiftBLL.deleteShift(id);
    res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;