const express = require('express');
const app = express();

const LoggerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler')
const { validateUser } = require('./utils/validation');

const PORT = process.env.PORT | 3000;

const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use(LoggerMiddleware);
app.use(errorHandler);

app.get('/', (req,res)=>{
  res.send(`
    <h1>Course express.js</h1>
    <p>This is an application node.js with express.js</p>`)
})

app.get('/users/:id',(req,res)=>{
  const userId= req.params.id;
  res.send(`Show information of user with ID: ${userId}`)
})

app.get('/search', (req,res)=>{
  const terms = req.query.terms || 'No founded';
  const category = req.query.category || 'all';

  res.send(`
    <h2>Search results: </h2>
    <p>Term: ${terms} </p>
    <p>Category: ${category}</p>
    `)
})

app.post('/form', (req, res) => {
  const name = req.body.name || 'User 1';
  const email =  req.body.email || 'Not provided';
  res.json({
    message: 'Received data',
    data: {
      name,
      email
    }
  })
})

app.post('/api/data', (req,res)=> {
  const data = req.body;

  if (!data || Object.keys(data).length===0) {
    return res.status(400).json({error: 'No JSON data received'})
  }

  res.status(201).json({
    message: 'JSON data received',
    data: req.body
  })
})

app.get('/users', (req,res)=>{
  fs.readFile(usersFilePath, 'utf-8', (err, data)=>{
    if (err) {
      return res.status(500).json({
        error: 'Data connection error'
      })
    }
    const users= JSON.parse(data);
    res.json(users);
  })
})

app.post('/users', (req,res)=> {
  const newUser = req.body;
  fs.readFile(usersFilePath, 'utf-8', (err, data)=>{
    if (err) {
      return res.status(500).json({error: 'Data connection error'})
    }
    const users = JSON.parse(data);

    const validation = validateUser(newUser, users);
    if (!validation.isValid) {
      return res.status(400).json({error:validation.error});
    }

    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err)=> {
      if (err) {
        return res.status(500).json({error: 'Error saving the user'})
      }
      res.status(201).json(newUser);
    })
  })
})

app.put('/users/:id', (req,res)=> {
  const userId= parseInt(req.params.id, 10);
  const updatedUser = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data)=>{
    if (err) {
      return res.status(500).json({error: 'Data connection error'})
    }
    let users = JSON.parse(data);

    const validation = validateUser(updatedUser, users, true);
    if (!validation.isValid) {
      return res.status(400).json({error: validation.error});
    }

    users =users.map(user=>
      user.id===userId?{...user, ...updatedUser}:user);
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err)=>{
        if (err) {
          return res.status(500).json({error:'Error updating the user'})
        }
        res.json(updatedUser);
      })
  });
})

app.delete('/users/:id', (req, res) => {
  const userId= parseInt(req.params.id, 10);
  fs.readFile(usersFilePath, 'utf8', (err,data)=> {
    if (err) {
      return res.status(500).json({error: 'Data connection error'});
    }
    let users=JSON.parse(data);
    users= users.filter(user=> user.id !== userId)
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err)=>{
      if (err) {
        return res.status(500).json({error: 'Error deleting user'})
      }
      res.status(204).send();
    })
  })
});

app.get('/error',(req, res, next)=>{
  next(new Error('Intentional error'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on: http://localhost:${PORT}`);
})

