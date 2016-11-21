var db = require('../db');
var Promise = require('bluebird');

module.exports = function () {
    var accounts = [
        {account: 'lihao@qq.com', password: 'password'},
        {account: 'admin@qq.com', password: 'password'},
    ];

    return {
        userPageLists: function (page, limit) {
            limit = limit === undefined ? 15 : parseInt(limit);
            page = page <= 0 ? 1 : parseInt(page);

            return Promise.using(db(), function (connection) {
                var queryCount = connection.queryAsync('select count(*) as sum from user');
                var queryRecords = connection.queryAsync('select * from user limit ' + (page - 1) * limit + ',' + limit);
                return Promise.all([queryCount, queryRecords])
                    .then(function (taskResult) {
                        var sum = taskResult[0].pop().sum;
                        var paginator = {
                            'pages': Math.ceil(sum / limit),
                            'current': page,
                            'count': sum,
                            'records': taskResult[1],
                        };

                        return paginator;
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
