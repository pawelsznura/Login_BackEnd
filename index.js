import path from 'path';
import express from 'express';
import userRoutes from './user.routes.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import authRoutes from './auth.routes.js'

var app = express();

import config from './config.js';
const PORT = config.port;
const MONGOURI = config.mongoUri;
// The database connection (just crash without it)
await mongoose.connect('mongodb://127.0.0.1/my_database');


// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', authRoutes)
app.use('/', userRoutes)

// Authorisation error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
  })
  

// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:'+PORT+'/');
});

