const express = require('express');
const app = express();
const port = process.env.PORTR || 8000;

const db = require('./config/mongoose');

// Require UserSchema
const user = require('./models/user');


// Body Parser
app.use(express.urlencoded({extended:true}));
 app.use(express.json());

app.get('/',(req,res)=>{
    res.end('Yeah Server is start');
})

const route = require('./routes/auth.js');

// Routes API
app.use('/api/auth',route);

app.listen(port, function(err){
    if(err){
        console.log('error in run the server',err);
    }
    console.log('Server is start on port::',port);
})

