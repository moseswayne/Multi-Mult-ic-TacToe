gridSize = 3;
boardContainer = new Array();
var i,j,k;
for(i=0;i<gridSize;i++) {
    boardContainer[i] = [];
    for(j=0;j<gridSize;j++) {
        boardContainer[i][j] = [];
        for(k=0;k<gridSize;k++) {
            boardContainer[i][j][k] = [];
        }
    }
}

var recursiveIndex = function(dimLeft,board,boardDim,boardFunc) {
    if(dimLeft<1) {
        board[0] = boardFunc(board,boardDim);
        return;
    }
    var i;
    for(i = 0;i<gridSize;i++) {
        var newDim = boardDim.slice();
        newDim.push(i);
        recursiveIndex(dimLeft-1,board[i],newDim,boardFunc);
    }
};

var bfunc = function(board,boardDim) {
    return '<div id="'+ boardDim.join() +'"></div>';
}
recursiveIndex(3,boardContainer,[],bfunc);
var bprint = function(board,boardDim) {
    console.log(board[0]);
    return board;
}
recursiveIndex(3,boardContainer,[],bprint);
console.log(boardContainer);