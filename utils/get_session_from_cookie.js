// 需要解密sessionId
var signature = require('cookie-signature');
var parserHeaderCookie = require('express/node_modules/cookie').parse;

module.exports = function (cookie, secret, fn) {
    var cookies = parserHeaderCookie(cookie);
    if (!cookies.sessionId) {
        return fn('No sessionId!');
    }

    // 解密sessionId
    var sessionId = (0 === cookies.sessionId.indexOf('s:')) ?
            signature.unsign(cookies.sessionId.slice(2), secret):
            cookies.sessionId;

    fileStore.get(sessionId, function (err, session) {
        if (err) {
            return fn(err);
        }

        if (!session || !session.user) {
            return fn('session doesn\'t exists');
        }

        return fn(null, session);
    });
};
