/**
 * Created by moses on 7/23/17.
 */
function GameBoard(size,dimensions) {
    var boardSize = size;
    var boardDim = dimensions;

    var myBoard = [];
    myBoard = constructBoard(size,dimensions,myBoard);

    var constructBoard = function(size,dim,board) {
        if (dim < 1) {
            return null;
        }
        for(var i = 0; i<size; i++) {
            board[i] = constructBoard(size,dim-1,[]);
        }
        return board;
    }

    var recursivePlay = function(board,moveArr,move,currDim) {
        if (currDim<2) {
            if(board[moveArr[0]]) {
                return false;
            }
            board[moveArr[0]] = move;
            return true;
        }
        recursivePlay(board[moveArr[0]],moveArr.slice(1),move,currDim-1);
    }

    this.playMove = function(moveArr,move){
        return recursivePlay(myBoard,moveArr,move,boardDim);
    }

    this.getSize = function() {
        return boardSize;
    }

    this.getDimensions = function() {
        return boardDim;
    }

    //NOTE: THIS IS FOR DEBUGGING PURPOSES ONLY. DELETE THIS FUNCTION WHEN DONE.
    this.showBoard = function() {
        console.log(myBoard);
    }

    return this;
}