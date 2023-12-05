
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db'); 
const saltRounds = 10;

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hash], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server error');
                return;
            }

            res.status(201).send('User registered');
        });
    });
});

module.exports = router;