var index = {
    dashboard: function (req, res) {
        var param = {
            title: '首页',
            subtitle: 'make the world better',
            breadscrumb: [
                {href: '/admin', title: '首页'}
            ]
        };

        // console.log(req.session.user);
        // console.log(accountInfo);
        // console.log(req.session);

        res.render('index/index', param);
    },
};

module.exports = index;
