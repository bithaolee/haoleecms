module.exports = function () {
    var accounts = [
        {account: 'lihao@qq.com', password: 'password'},
        {account: 'admin@qq.com', password: 'password'},
    ];

    return {
        userLists: function () {
            return accounts;
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
