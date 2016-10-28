var express = require('express');
var router = express.Router();
var index = require('./controller/index');
var user = require('./controller/user');
var article = require('./controller/article');

// user login logic
router.all('*', function (req, res, next) {
    var user = req.session.user;
    if (req.path !== '/login' && req.path !== '/user/authentication' && user === undefined) {
        if (!req.xhr) {
            return res.redirect('/admin/login');
        }

        return res.json({code: 100, message: 'need login', data: {redirect: '/admin/login'}});
    }

    if (req.path === '/login' && user !== undefined) {
        return res.redirect('/admin');
    }

    // res.locals.xxx = xxx; // 保存views的上下文，可在views中直接使用
    next();
});


router.get('/', index.dashboard);
router.get('/login', user.login);
router.post('/user/authentication', user.authentication);
router.get('/article', article.index);
router.get('/article/add', article.add);

module.exports = router;

