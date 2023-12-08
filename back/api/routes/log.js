const express = require('express');
const router = express.Router();
const config = require('../config/db');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { generateToken } = require('../midleware/jwtUtils'); 

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '',      
    database: 'm2l'   
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(result[0]);
                } else {
                    console.log('User not found with email:', email);
                    resolve(null);
                }
            });
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                throw err;
            }
            if (isMatch) {
                // Passwords match
                req.session.userId = user.id;
                
                // Generate token
                const token = generateToken(user);
                
                res.json({ message: 'User logged in', token }); // Send the token in the response
            } else {
                // Passwords don't match
                console.log('Invalid password for user:', email);
                res.status(400).json({ message: 'Invalid password' });
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;