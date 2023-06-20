const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/RESTAPI');


const db = mongoose.connection;

db.on('err',console.error.bind(console,'Errror in connecting to MongoDB'));

db.once('open',function(){
    console.log('connected to DataBase :: MongoDB');
})

module.exports = db;

