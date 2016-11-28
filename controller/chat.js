module.exports = {
    index: function (req, res) {

        res.render('chat/index', {account: req.session.user.account});
    }
};
