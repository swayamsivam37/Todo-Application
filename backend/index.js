const express = require("express");
const app = express();

app.use(express.json());

const port = process.env || 3000

app.post('/todo', (req, res)=>{
    
})

app.get('/todos', (req, res)=>{

})

app.put('/completed', (req, res)=>{

})



app.listen(port, ()=>{
    console.log('Listing on port', port);
})
