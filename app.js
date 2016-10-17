var express = require('express');
var config = require('./config');
var router = require('./router');
var db = require('./db');
var app = express();

// mount a router map
express.use('/', router);

// render view
app.set('view', './views');
app.set('view engines', 'jade');

// deal static files
app.use(express.static('public'));

// 404
// app.use(function (req, res, next) {
//     res.status(404).send('404 not found');
// });

// error handler
app.use(function (err, req, res, next) {
    // logger error info
    // logger();
    next();
});

app.use(function (err, req, res, next) {
    // if is a xml http request
    if (req.xhr) {
        res.status(500).send('500 internal error');
    } else {
        // render a page of status 500

    }
});

var server = app.listen(config.port, function () {
    var address = server.address();

    console.log('app listening at http://%s:%s', address.host, address.port);
});
