
const db = require('../db.js');

exports.findAll = (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching users');
    } else {
      res.send(results);
    }
  });
};

exports.findOne = (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching user');
    } else {
      res.send(results[0]);
    }
  });
};