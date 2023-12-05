const express = require('express')
const cors = require ('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const path = require('path')
 const mysql = require('mysql')
 const db = require('./back/api/config/db')
 const userRoutes = require('./back/api/routes/user');
var session = require ('express-session');
require('dotenv').config();

const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
app.use(cookieParser()); 


app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use(express.static(path.join(__dirname, 'assets')));
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});