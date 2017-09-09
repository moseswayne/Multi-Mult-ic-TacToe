/**
 * Created by moses on 8/13/17.
 */
function TicTacToeGame(socket) {
    var myBoard;
    var players = [];
    var movePlayers;
    var mySocket = socket;
    var numPC = 2;

    //Using this space to flesh out design thoughts
    //use function handles passed through the gameData object to store in the players loop
    //which is called each turn to force a move from a player. In the case of AI, this would
    //just call the AI's function to generate a move based on the current data.
    this.initiateRoom = function() {
        mySocket.on('connection', function(socket) {
            console.log(mySocket.clients());

            socket.on('setNum', function (number) {
                numPC = number;

            }

            socket.on('start',function(packagedData) {
                startGame(packagedData);
                var playerOrdering = players.slide();
                mySocket.emit('begin',playerOrdering);
            });
            socket.on('play',function(move) {
                mySocket.emit('post',move);
                console.log(move);
            });
        });
    }

    this.isJoinable = function() {
        return numPC>players.length;
    }

    var startGame = function(gameData) {
        myBoard = require('./board')(gameData.boardSize,gameData.dimensions);
        var playerData = gameData.players;

    }

    var runGame = function() {

    }

    return this;
}

module.exports = function(locSocket) {
    var newGame = TicTacToeGame(locSocket);
    return newGame;
}