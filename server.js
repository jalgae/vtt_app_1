

var _express = require('express');
var _bodyParser = require('body-parser');
var _internalIp = require('internal-ip');
var _fileupload = require('express-fileupload');
var _path = require('path');

var _gen = require('./generate');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


var _app = _express();

_app.use(_fileupload());
_app.use(_bodyParser.json());
_app.use(_bodyParser.urlencoded({
    extended: true
}));
_app.use(allowCrossDomain);
_app.use('/public', _express.static(_path.join(__dirname, './public')))

_app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/upload/index.html');
});

_app.post('/lq/form/api', function (req, res) {
    _gen.proc_excel(req, res);
})

_app.post('/lq/api', function (req, res) {
    _gen.proc_api(req, res);
});

_app.get('/success', function (req, res) {
    res.sendFile(__dirname + '/public/success/index.html');
});

var _server = require('http').Server(_app);

var port = 9100;
var ip = _internalIp.v4();

_server.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Server start');
    console.log(`Sever listen to port ${port}`);
});