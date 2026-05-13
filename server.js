const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.port || 3000;
const mongodb = require('./data/database');
const bodyParser = require ('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use('/', require('./routes'));


mongodb.initDatabase((err) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(port);
        console.log('Web server is listening at port ' + port);
        console.log('Database is connected!')
    }
})