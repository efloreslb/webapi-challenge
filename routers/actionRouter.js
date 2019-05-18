const express = require('express');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const actions = await Actions.get();
      res.status(200).json(actions);
   } catch {
      res.status(500).json({message: "Error retrieving data"})
   }
})

router.get('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const action = await Actions.get(id);
      res.status(200).json(action);
   } catch {
      res.status(500).json({message: "Error retrieving data"})
   }
})

router.post('/', async (req, res) => {
   const { body } = req;
   try {
      const action = await Actions.insert(body);
      res.status(201).json(action);
   } catch {
      res.status(500).json({message: "Error creating data"})
   }
})

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const action = await Actions.remove(id);
      res.status(200).json(action);
   } catch {
      res.status(500).json({message: "Error deleting data"})
   }
})

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { body } = req;
   try {
      const action = await Actions.update(id, body);
      res.status(200).json(action);
   } catch {
      res.status(500).json({message: "Error updating data"})
   }
})

module.exports = router;