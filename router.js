var express = require('express');
var router = express.Router();
var index = require('./controller/index');
var user = require('./controller/user');

// user login logic
router.all('*', function (req, res, next) {
    next();
});


router.get('/login', user.login);
router.get('/', index.dashboard);

module.exports = router;

