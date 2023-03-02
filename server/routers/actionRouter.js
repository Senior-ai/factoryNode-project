const express = require('express');
const actions = require('../DAL/actionsDAL');
const router = express.Router();
//This isn't really necessary as everything happens inside the application 
//But just wrote it to make everything within order and to give the option to test it w more api endpoints
//Add action
router.route('/').post(async (req, res) => {
    try {
      const obj = req.body;
      const data = await actions.addAction(obj);
      res.json(data);
      res.status(200)
    } catch (error) {
      res.json(error);
    }
  })
  //get all actions
  router.route('/').get(async (req, res) => {
    try {
      const data = await actions.getActions();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  })

  module.exports = router;