var user = {
    login: function (req, res) {
        res.render('user/login', {name: 'haolee'});
    },
    authentication: function (req, res) {

    },
    lists: function () {},
    add: function () {},
    edit: function () {},
    delete: function () {}
};

module.exports = user;
