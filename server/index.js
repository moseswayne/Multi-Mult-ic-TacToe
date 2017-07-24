/**
 * Created by moses on 7/8/17.
 */
var express = require('express');
var router = express.Router();
var app = express();
// var server = app.listen(3000, '192.168.0.6', 511, function () {
//     console.log('server running at 192.168.0.6:3000');
// });
var server = require('http').createServer(app);


var io = require('socket.io')(server);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("index.html");
});

io.on('connection', function(socket) {
    console.log('Established client connection');
    socket.on()
})

module.exports = router;
