var user = require('../model/user')();

module.exports = {
    login: function (req, res) {
        res.render('user/login', {name: 'haolee'});
    },
    authentication: function (req, res) {
        var param = req.body;
        var account = param.username;
        var password = param.password;

        var accountInfo = user.getUserInfo(account);
        if (!accountInfo || accountInfo.password !== password) {
            return res.json({code: 500, message: 'account or password not match'});
        }

        // 设置登陆态
        req.session.user = accountInfo;
        return res.json({code: 200, message: 'ok'});
    },
    logout: function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                return res.render('error/500');
            }
        });
        return res.redirect('/admin/login');
    },
    lists: function (req, res) {
        user.userLists(function (err, user) {
            console.log(user);
            res.render('user/lists', user);
        });
    },
    add: function () {},
    edit: function () {},
    delete: function () {}
};
