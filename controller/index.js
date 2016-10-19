var index = {
    dashboard: function (req, res) {
        var param = {
            title: '首页',
            subtitle: 'make the world better',
            breadscrumb: [
                {href: '/admin', title: '首页'}
            ]
        };
        res.render('index/index', param);
    },
};

module.exports = index;
