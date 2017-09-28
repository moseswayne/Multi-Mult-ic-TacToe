function uiBoard(screenDiv,sock) {

    var usedMoves = [];
    var screen = screenDiv;
    var boardContainer;
    var socket = sock;
    var moveTurn = false;

    var checkEmit = function(move) {

        if(!moveTurn) {
            console.log('wat');
            return;
        }
        if(usedMoves.includes(move)) {
            alert("That square has already been played!");
            return;
        }
        usedMoves.push(move);
        move = move.split('x');
        socket.emit('play',move);
    };

    var setUpTags = function(ids) {
        console.log('trying');
        var ind;
        for(ind in ids) {
            let myBox = ids[ind];
            $('#'+ids[ind]).on('click',function() {
                //$('#'+myBox).append('X');
                console.log(myBox);
                checkEmit(myBox);
            });

        }
    };

    var recursiveIndex = function(grid,dimLeft,board,boardDim,boardFunc) {
        if(dimLeft<1) {
            board[0] = boardFunc(board,boardDim);
            return;
        }
        var i;
        for(i = 0;i<grid;i++) {
            var newDim = boardDim.slice();
            newDim.push(i);
            recursiveIndex(grid,dimLeft-1,board[i],newDim,boardFunc);
        }
    };

    this.initializeBoard = function(size,dim) {

        var gridSize = size;
        var dimensions = dim;

        boardContainer = [];
        var i,j;
        for(i=0;i<gridSize;i++) {
            boardContainer[i] = [];
            for(j=0;j<gridSize;j++) {
                boardContainer[i][j] = [];
            }
        }

        for(i=2;i<dimensions;i++) {
            var currBoard = boardContainer.slice();
            boardContainer = new Array();
            for(j=0;j<gridSize;j++) {

            }
            for(j = 0;j<gridSize;j++) {
                boardContainer.push(currBoard);
            }
        }

        // var divFunc = function(board,boardDim) {
        //     console.log(boardDim);
        //     return '<div id="'+ boardDim.join() +'"></div>';
        // }
        //
        // recursiveIndex(3,boardContainer,[],divFunc);
        var tableArr = [];
        var idArr = [];
        var tabFunc = function(board,boardDim) {
            tableArr.push('<div class="content"><div class="item" id="'+ boardDim.join('x') +'"></div></div>');
            idArr.push(boardDim.join('x'));
            return board[0];
        }
        recursiveIndex(gridSize,dimensions,boardContainer,[],tabFunc);
        var htmlStr = '<p>';
        for(i=0;i<tableArr.length;i++) {
            if(i%(gridSize*gridSize) === 0) {
                if(i!==0) {
                    htmlStr+='</tr></table>';
                }
                htmlStr+='<table>';
            }
            if(i%gridSize === 0) {
                if(i%gridSize*gridSize !== 0) {
                    htmlStr+='</tr>';
                }
                htmlStr+='<tr>';
            }
            htmlStr+='<td>'+tableArr[i]+'</td>';
        }
        htmlStr+='</p>';
        screen.empty();
        screen.append(htmlStr);
        var widthCalc = ''+((100-2*size)/size)+'%';
        $('table').css('width',widthCalc);
        setUpTags(idArr);
    };


    this.playPiece = function(cellID,tok) {
        $('#'+cellID).append(tok);
    };

    this.flipTurn = function(bool) {
        moveTurn = bool;
    };


    return this;
}

