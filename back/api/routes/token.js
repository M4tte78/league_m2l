// routes/token.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../midleware/tokenmid');
const path = require('path');

router.get('/index', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../'));
});

router.get('/calendrier', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../path/to/your/calendrier.html'));
});

router.get('/contact-us', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../path/to/your/contact-us.html'));
});

router.get('/features', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../path/to/your/features.html'));
});

router.get('/pricing', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../path/to/your/pricing.html'));
});

router.get('/slider', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../path/to/your/slider.html'));
});

module.exports = router;