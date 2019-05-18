const express = require('express');

const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

const server = express();

server.use(express.json());
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.get('/', (req, res) => {
   res.send(`
      <h1>Welcome to Actions and Projects API</h1>
      <p>Use /actions to access action router</p>
      <p>Use /projects to access project router</p>
   `)
})

module.exports = server;