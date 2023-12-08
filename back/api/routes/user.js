const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'm2l'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return err;
        }
        console.log(hash)
        db.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hash], (err, result, fields) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server error');
                return err;
            }
            res.status(201).send('User registered');
        });
    });
});

module.exports = router;