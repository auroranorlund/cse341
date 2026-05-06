const express = require('express')
const app = express()
const env = require("dotenv").config()
const port = process.env.port || 3000

app.use('/', require('./routes'));

app.listen(port);
console.log('Web server is listening at port ' + port)