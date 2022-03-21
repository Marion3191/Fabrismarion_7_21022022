const express = require('express');
const mysql = require('./dataBase/mysql');
const postRoutes = require('./routes/Posts');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors')
require('dotenv').config();

const app = express();




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors())
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/Posts', postRoutes);//stuffroutes
app.use('/api/auth', userRoutes);//userroutes


module.exports = app;