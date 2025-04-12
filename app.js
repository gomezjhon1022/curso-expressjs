const express = require('express');
const app = express();

const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

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

app.listen(PORT, () => {
  console.log(`Example app listening on: http://localhost:${PORT}`);
})

