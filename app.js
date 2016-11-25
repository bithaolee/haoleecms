var express = require('express');
var config = require('./config');
var router = require('./router');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var parserHeaderCookie = require('express/node_modules/cookie').parse;
var Session = require('express-session');
var fileStore = require('session-file-store')(Session);
var http = require('http');

// var db = require('./db');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

// deal with cookie
app.use(cookieParser());

var session = Session({
    cookie: {path: '/', httpOnly: true, secure: false, maxAge: 86400},
    name: 'sessionId',
    secret: 'abcdefghijklmnopqrstuvwxyz',
    store: new fileStore({
        path: __dirname + '/data/session',
        ttl: 3600000,
    }),
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

// authentication
io.set('authorization', function (handSharkData, accept) {
    (function (handSharkData) {
        if (!handSharkData.headers.cookie) {
            return accept('No cookie transmitted!', false);
        }

        handSharkData.cookie = parserHeaderCookie(handSharkData.headers.cookie);
        if (!handSharkData.cookie.sessionId) {
            return accept('No sessionId!', false);
        }

        // TODO
        fileStore.get(handSharkData.cookie.sessionId, function (err, session) {
            console.log(session);
        });
        // console.log(handSharkData.cookie);
        return accept('pass', true);
    })(handSharkData);
});

var onlineNumber = 0;
// deal with websocket request
io.on('connection', function (socket) {
    onlineNumber ++;
    var req = socket.request;
    // join a room
    socket.join('group_chat');

    socket.on('chat', function (data) {
        console.log(req.headers);
        // console.log(req);
        // sending message to this group chat
        // io.to('group_chat').emit('chat', {user: req.session.user, data: data});
    });

    socket.on('disconnect', function () {
        onlineNumber --;
        // leave group chat room
        socket.leave('group_chat');
    });
    console.log('在线总人数：' + onlineNumber);
});

module.exports = app;
