const express = require('express')
const cors = require ('cors')
const session = require('express-session');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const path = require('path')
const mysql = require('mysql')
const db = require('./back/api/config/db')
const logRoutes = require('./back/api/routes/log');
const userRoutes = require('./back/api/routes/user');
const authRoutes = require('./back/api/midleware/tokenmid');
const token = require('./back/api/routes/token')
const { generateToken } = require('./back/api/middlewares/jwtUtils');
const corsOptions = {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Allow both origins
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Origin',
  credentials: true, // This allows cookies to be sent with the CORS request
}


require('dotenv').config();

const app = express()

app.use(cors(corsOptions)); // Use cors with corsOptions
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if your using https
}));
app.use('/jwsUtils', jwsutils);
app.use('/token', token);
app.use('/tokenmid', authRoutes);
app.use(cookieParser()); 
app.use('/log', logRoutes);
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/user', userRoutes);
app.get('/front/index', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});


const port = process.env.PORT || 3001; 
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});