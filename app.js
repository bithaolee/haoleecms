var express = require('express');
var config = require('./config');
var router = require('./router');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Session = require('express-session');
var FileStore = require('session-file-store')(Session);
var getSessionFromCookie = require('./utils/get_session_from_cookie');
var http = require('http');

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

var secret = 'abcdefghijklmnopqrstuvwxyz'; // session secret

// deal with cookie
app.use(cookieParser());

fileStore = new FileStore({
    path: __dirname + '/data/session',
    ttl: 3600000,
});

var session = Session({
    cookie: {path: '/', httpOnly: true, secure: false, maxAge: 86400},
    name: 'sessionId',
    secret: secret,
    store: fileStore,
});

// deal with session
app.use(session);

// deal body data
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.redirect('/admin/login');
});
// mount a router map
app.use('/admin', router);

// render view
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// deal static files
app.use(express.static('public'));

// 404
app.use(function (req, res, next) {
    res.render('error/404');
});

// error handler
app.use(function (err, req, res, next) {
    // logger error info
    // logger();
    console.log(err);
    next();
});

app.use(function (err, req, res, next) {
    // if is a xml http request
    if (req.xhr) {
        res.json({code: 500, message: err});
    } else {
        // render a page of status 500
        res.send('500 ' + err);
    }
});

server.listen(config.port, function (err) {
    if (err) {
        console.log('error');
    } else {
        var address = server.address();

        console.log('app listening at http://%s:%s', address.host, address.port);
    }
});

var onlineNumber = 0;

io.use(function (socket, next) {
    if (!socket.request.headers.cookie) {
        return next(new Error('No cookie transmitted!'));
    }

    getSessionFromCookie(socket.request.headers.cookie, secret, function (err, session) {
        if (err) {
            return next(new Error(err));
        }

        next();
    });
});

// deal with websocket request
io.sockets.on('connection', function (socket) {
    var req = socket.request;

    onlineNumber ++;
    // retrive session
    getSessionFromCookie(req.headers.cookie, secret, function (err, session) {
        if (err) {
            console.log('获取用户信息失败');
            return;
        }

        socket.on('chat', function (data) {
            // sending message to this group chat
            socket.broadcast.to('group_chat').emit('chat', {user: session.user.account, data: data});
        });
    });

    // join a room
    socket.join('group_chat');

    socket.on('disconnect', function () {
        onlineNumber --;
        // leave group chat room
        socket.leave('group_chat');
        console.log('在线总人数：' + onlineNumber);
    });
    console.log('在线总人数：' + onlineNumber);
});

module.exports = app;
