'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({
  path    : '/',
  secret : process.env.secret,
  resave : true,
  saveUninitialized : false,
  httpOnly: false,
  maxAge: null
}))
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(cors());

// ROUTING //
const routes = require('./routes/routes.js');
app.use('/', routes);

mongoose.connect(process.env.DB)
.then(connection => {
    console.log('Connected to MongoDB')
})
.catch(error => {
  console.log(error.message)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

let PORT = 9000;
if(process.env.NODE_ENV == 'production'){
  PORT = 80;
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
