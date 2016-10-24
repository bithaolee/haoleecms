var express = require('express');
var router = express.Router();
var index = require('./controller/index');
var user = require('./controller/user');
var article = require('./controller/article');

// user login logic
router.all('*', function (req, res, next) {
    next();
});


router.get('/', index.dashboard);
router.get('/login', user.login);
router.post('/admin/user/authentication', user.authentication);
router.get('/article', article.index);
router.get('/article/add', article.add);

module.exports = router;

