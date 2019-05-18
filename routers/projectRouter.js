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
      if (project) {
         res.status(200).json(project)
      } else {
         res.status(404).json({message: "The project with that id could not be found"})
      }
   } catch {
      res.status(500).json({error: "Error retrieving data"})
   }
})

router.post('/', async (req, res) => {
   const { body } = req;
   const { name, description } = req.body;
   try {
      const project = await Projects.insert(body);
      if (Object.keys(name).length && Object.keys(description).length) {
         res.status(201).json(project);
      } else {
         res.status(400).json({message: "Please include a name and description"})
      }
   } catch {
      res.status(500).json({error: "Error posting data"})
   }
})

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const project = await Projects.remove(id);
      if (project > 0) {
         res.status(200).json(project)
      } else {
         res.status(400).json({message: "The project with that id could not be found"})
      }
   } catch {
      res.status(500).json({error: "Error deleting data"})
   }
})

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { body } = req;
   const { name, description } = req.body;
   try {
      const project = await Projects.update(id, body);
      if (Object.keys(name).length && Object.keys(description).length) {
         res.status(201).json(project);
      } else {
         res.status(400).json({message: "Please include a name and description"})
      }
   } catch {
      res.status(500).json({error: "Error updating data"})
   }
})

router.get('/:id/actions', async (req, res) => {
   const { id } = req.params;
   try {
      const project = await Projects.getProjectActions(id);
      if (project != "") {
         res.status(200).json(project)
      } else {
         res.status(400).json({message: "The project does not exist or there are no actions"})
      }
   } catch {
      res.status(500).json({error: "Error retrieving data"})
   }
})

module.exports = router;