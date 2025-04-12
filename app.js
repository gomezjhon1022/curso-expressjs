const express = require('express');
const app = express();

const PORT = process.env.PORT | 3000;

app.get('/', (req,res)=>{
  res.send(`
    <h1>Course express.js</h1>
    <p>This is an application node.js with express.js</p>`);
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

