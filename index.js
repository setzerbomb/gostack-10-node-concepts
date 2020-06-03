const express = require('express');

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Route Params = /users/1
// Request body =  {"name":"Gabriel"}

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Method: ${req.method}; URL: ${req.url}`);
  console.timeEnd('Request');
  return next();
});

const checkUserExists = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'User name is required' });
  }
  return next();
};

const checkUserInArray = (req, res, next) => {
  const { index } = req.params;
  if (!users[index]) {
    return res.status(400).json({ error: 'User does not exists' });
  }
  return next();
};

const users = ['Diego', 'Cláudio', 'Victor'];

server.get('/users', (req, res) => {
  res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  res.json(users[index]);
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
