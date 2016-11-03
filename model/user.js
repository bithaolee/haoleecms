var pool = require('../db');

module.exports = function () {
    var accounts = [
        {account: 'lihao@qq.com', password: 'password'},
        {account: 'admin@qq.com', password: 'password'},
    ];

    return {
        userLists: function (callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err);
                }

                connection.query('select * from user', function (err, rows) {
                    if (err) {
                        callback(err);
                    }

                    callback(undefined, rows);
                });
            });
        },
        getUserInfo: function (account) {
            var accountInfo = false;
            for (var i in accounts) {
                if (accounts[i].account === account) {
                    accountInfo = accounts[i];
                }
            }

            return accountInfo;
        }
    };
};
