//This function/file is scratch space because I'm so rusty on recursion

function constructBoard(size,dim,board) {
    if (dim < 1) {
        return null;
    }
    for(var i = 0; i<size; i++) {
        board[i] = constructBoard(size,dim-1,[]);
    }
    return board;
}
function recursivePlay(board,moveArr,move,currDim) {
    if (currDim<2) {
        board[moveArr[0]] = move;
        return;
    }
    recursivePlay(board[moveArr[0]],moveArr.slice(1),move,currDim-1);
}

myBoard = [];

myBoard = constructBoard(3,3,myBoard);
recursivePlay(myBoard,[0,0,0],'Player',3);
//myBoard[0][0][0] = 'Player 1';
console.log(myBoard);