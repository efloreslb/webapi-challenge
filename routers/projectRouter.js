const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', async (req, res) => { // RETURNS NULL
   try {
      const projects = await Projects.get();
      res.status(200).json(projects)
   } catch {
      res.status(500).json({error: "Error retrieving data"})
   }
})

router.get('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const project = await Projects.get(id);
      res.status(200).json(project)
   } catch {
      res.status(500).json({error: "Error retrieving data"})
   }
})

router.post('/', async (req, res) => {
   try {
      const project = await Projects.insert(req.body);
      res.status(201).json(project);
   } catch {
      res.status(500).json({error: "Error posting data"})
   }
})

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const project = await Projects.remove(id);
      res.status(200).json(project)
   } catch {
      res.status(500).json({error: "Error deleting data"})
   }
})

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { body } = req;
   try {
      const project = await Projects.update(id, body);
      res.status(200).json(project);
   } catch {
      res.status(500).json({error: "Error updating data"})
   }
})

router.get('/actions/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const project = await Projects.getProjectActions(id);
      res.status(200).json(project);
   } catch {
      res.status(500).json({error: "Error retrieving data"})
   }
})

module.exports = router;