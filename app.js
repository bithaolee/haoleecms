var express = require('express');
var config = require('./config');
var router = require('./router');
var app = express();

// mount a router map
express.use('/', router);

// deal static files
app.use(express.static('public'));

// 404
app.use(function (req, res, next) {
    res.status(404).send('404 not found');
});

// error
app.use(function (err, req, res, next) {
    res.status(500).send('500 internal error');
});

var server = app.listen(config.port, function () {
    var address = server.address();

    console.log('app listening at http://%s:%s', address.host, address.port);
});
