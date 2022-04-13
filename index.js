require('dotenv').config();

const urlencoded = require('body-parser/lib/types/urlencoded');
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const mysql=require('mysql');
const connection=require('./db');
const bodyParser=require('body-parser');
app.use(express.json())

//Routes
const authRoutes = require('./Routes/routes');

//Declare API category endpoints
app.use('/',authRoutes)

//MongoDB connection
// const dbURI = process.env.URI
// mongoose.connect(dbURI)
//     .then((result) => app.listen(port))
//     .catch((err) => console.log(err))
// console.log(`API listening to http://localhost:${port}...`);


//MySQL connection

app.listen(port)
console.log(`API listening to http://localhost:${port}...`);

