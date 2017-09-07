function gameManager() {
    var currentGames = new Map();

    this.checkExistence = function(roomName) {
        return currentGames.has(roomName);
    }

    this.createNewGame = function(socket,roomName) {
        console.log("pls");
        var newGame = require('./game')(socket);
        currentGames.set(roomName,newGame);
        newGame.initiateRoom();
    }

    return this;
}

var gameMgr = gameManager();

module.exports = gameMgr;