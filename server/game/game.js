/**
 * Created by moses on 8/13/17.
 */
function TicTacToeGame() {
    var myBoard;
    var players;

    //Using this space to flesh out design thoughts
    //use function handles passed through the gameData object to store in the players loop
    //which is called each turn to force a move from a player. In the case of AI, this would
    //just call the AI's function to generate a move based on the current data.
    this.startGame = function(gameData) {
        myBoard = GameBoard(gameData.boardSize,gameData.dimensions);
        var playerData = gameData.players;
    }

    var runGame = function() {

    }

    return this;
}