var express = require('express');
var router = express.Router();

router.use();

// user login logic
app.all('/admin', function (req, res, next) {
    // login logic
    next();
});

app.get('/', function (req, res) {
    res.status(200).send('congratulation');
});


