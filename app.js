var express = require('express');
var config = require('./config');
var router = require('./router');
var nunjucks = require('nunjucks');
// var db = require('./db');
var app = express();

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
    res.status(404).send('404 not found');
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
        res.status(500).send('500 internal error');
    } else {
        // render a page of status 500
        res.send('shit');
    }
});

var server = app.listen(config.port, function () {
    var address = server.address();

    console.log('app listening at http://%s:%s', address.host, address.port);
});
