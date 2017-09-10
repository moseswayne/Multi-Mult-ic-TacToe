/**
 * Created by moses on 7/8/17.
 */
var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var index = require('./index');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);

var gameMgr = require('./game/gameManager');

app.route('/:sessionId').get((req, res)  => {
    console.log(req.params.sessionId);
    if((!gameMgr.checkExistence(req.params.sessionId)) || gameMgr.checkFull(req.params.sessionId)){
        console.log("I'm trying");
        res.redirect('/');
    } else {
        gameMgr.sendHost(req.params.sessionId,req.protocol + '://' + req.get('host') + req.originalUrl);
        res.render("gameRoom");
    }
});

io.on('connection', function(socket) {
    console.log('Established public connection');

    socket.on('joinRoom', function(roomName) {
        console.log(gameMgr.checkExistence(roomName));
        if(!gameMgr.checkExistence(roomName)) {
            //create room and redirect
            //pls work
            var localSocket = io.of('/'+roomName);
            gameMgr.createNewGame(localSocket,roomName);
        }
        //console.log(myAns);
    });

    socket.on('something', function() {
        console.log("yay");
    });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

module.exports.getServer = function(){
    return server;
}