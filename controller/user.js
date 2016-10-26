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

        console.log(accountInfo);
        // 设置登陆态
        res.session.user = 'tony';
        // res.session.user = accountInfo;
        return res.json({code: 200, message: 'ok'});
    },
    lists: function () {},
    add: function () {},
    edit: function () {},
    delete: function () {}
};
