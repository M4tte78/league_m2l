// routes/token.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../midleware/tokenmid');

router.get('/index', verifyToken, (req, res) => {

});

router.get('/calendrier', verifyToken, (req, res) => {

});

router.get('/contact-us', verifyToken, (req, res) => {

});

router.get('/features', verifyToken, (req, res) => {

});

router.get('/pricing', verifyToken, (req, res) => {

});

router.get('/slider', verifyToken, (req, res) => {

});

module.exports = router;