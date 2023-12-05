
const users = require('../controllers/user.controller.js');

module.exports = (app) => {
    app.get('/users', users.findAll);
    app.get('/users/:id', users.findOne);
};
