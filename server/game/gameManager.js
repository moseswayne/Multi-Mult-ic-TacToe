var mySocket;

function gameManager() {
    var currentGames = new Map();

    this.checkExistence = function(roomName) {
        return currentGames.has(roomName);
    }

    this.createNewGame = function(socket,roomName) {
        currentGames.set(roomName,socket);
    }

    return this;
}

var gameMgr = gameManager();

module.exports = gameMgr;