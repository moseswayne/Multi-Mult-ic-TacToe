/**
 * Created by moses on 8/13/17.
 */
var shuffle = require('shuffle-array');

function TicTacToeGame(socket) {
    var myBoard;
    var players = [];
    var playerData = new Map();
    var movePlayers;
    var playerOrdering;
    var mySocket = socket;
    var numPC = 2;
    var numMove = 0;
    var myRoom;
    var myHost;
    var gameInfo;

    //Using this space to flesh out design thoughts
    //use function handles passed through the gameData object to store in the players loop
    //which is called each turn to force a move from a player. In the case of AI, this would
    //just call the AI's function to generate a move based on the current data.
    this.initiateRoom = function(room) {
        myRoom = room;
        var conNum=0;
        mySocket.on('connection', function(socket) {
            console.log('joined');
            mySocket.emit('playJoin',conNum);
            conNum++;
            players.push(socket.id);
            var data = {
                name:"player"+conNum,
                moves:[],
                token:conNum
            };

            playerData.set(socket.id,data);

            socket.on('setNum', function (number) {
                numPC = number;
            });
            
            socket.on('name', function (newName) {
                playerData.get(socket.id).name = newName;
            });

            socket.on('addAI', function (newName) {
                var testBot = require('./ai/minmaxAI')(5,myHost);
                testBot.initiateAI();
            });

            socket.on('start',function(packagedData) {
                startGame(packagedData);
                mySocket.emit('begin',playerOrdering);
            });
            socket.on('play',function(move) {
                if(!myBoard.playMove(move,playerData.get(socket.id).token)){
                    socket.emit('invalid',move);
                } else {
                    // mySocket.emit('post', move);
                    // console.log(move);

                    let checkWin = require('./game/win');
                    if(checkWin(playerData.get(socket.id).moves,move,gameInfo.gridSize,gameInfo.dimension)) {
                        socket.emit('win');
                        socket.broadcast.emit('lose',playerData.get(socket.id).name);
                    } else {
                        playerData.get(socket.id).moves.push(move);
                        mySocket.emit('disable');
                        let toMove = playerOrdering[++numMove % playerOrdering.length];
                        socket.broadcast.to(toMove).emit('enable');
                    }
                }
            });
        });
    };

    this.isJoinable = function() {
        return numPC>players.length;
    };

    this.setHost = function(newHost) {
        if(!(myHost)) {
            myHost = newHost;
        }
    }

    var startGame = function(gameData) {
        gameInfo = gameData;
        var bot;
        var bot_num = 0;
        for(bot in gameData.aiList) {
            var myAI = require('./ai/minmaxAI')(bot.difficulty,myRoom);
            let name = "Bot_" + bot.difficulty + "_" + ++bot_num;
            players.push(name);

        }
        playerOrdering = players.slice();
        shuffle(playerOrdering);
        myBoard = require('./board')(gameData.boardSize,gameData.dimensions);
        var playerData = gameData.players;

    };

    var runGame = function() {

    };

    return this;
}

module.exports = function(locSocket) {
    var newGame = TicTacToeGame(locSocket);
    return newGame;
};