function gameManager() {
    var currentGames = new Map();

    this.checkExistence = function(roomName) {
        return currentGames.has(roomName);
    }

    this.checkFull = function(roomName) {
        return !currentGames.get(roomName).isJoinable();
    }

    this.createNewGame = function(socket,roomName) {
        console.log("pls");
        var newGame = require('./game')(socket);
        currentGames.set(roomName,newGame);
        newGame.initiateRoom(roomName);
    }

    this.sendHost = function(room,reqHost) {
        currentGames.get(room).setHost(reqHost);
    };

    return this;
}

var gameMgr = gameManager();

module.exports = gameMgr;