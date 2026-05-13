const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.port || 3000;
const mongodb = require('./data/database');
const bodyParser = require ('body-parser');

app.use(bodyParser.json());
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