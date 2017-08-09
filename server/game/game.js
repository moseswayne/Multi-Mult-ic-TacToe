/**
 * Created by moses on 7/23/17.
 */
function TicTacToe(size,dimensions) {
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

    var recursiveIndex = function () {

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

    //TODO: write this function, should be pretty simple, but need to figure out how to recursively index into array
    var isValidMove = function(moveArr) {
        return true;
    }

    this.playMove = function(moveArr,move){
        if (!isValidMove(moveArr)) {
            return false;
        }
        return recursivePlay(myBoard,moveArr,move,boardDim);
        //return true;
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