var pool = require('../db');

module.exports = function () {
    var accounts = [
        {account: 'lihao@qq.com', password: 'password'},
        {account: 'admin@qq.com', password: 'password'},
    ];

    return {
        userPageLists: function (page, callback, limit) {
            limit = limit === undefined ? 15 : parseInt(limit);
            page = page <= 0 ? 1 : parseInt(page);

            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err);
                }

                connection.query('select count(*) as sum from user', function (err, count) {
                    if (err) {
                        callback(err);
                    }
                    var sum = count.pop().sum;
                    connection.query('select * from user limit ' + (page - 1) * limit + ',' + limit, function (err, rows) {
                        var paginator = {
                            'pages': Math.ceil(sum / limit),
                            'current': page,
                            'count': sum,
                            'records': rows,
                        };

                        callback(undefined, paginator);
                    });
                });
            });
        },
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
