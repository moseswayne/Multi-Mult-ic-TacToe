function uiBoard(screenDiv) {

    var screen = screenDiv;
    var boardContainer;

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
        setUpTags(idArr);
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

    var playPiece = function(cellID) {

    };

    var setUpTags = function(ids) {
        var ind;
        for(ind in ids) {
            let myBox = ids[ind];
            $('#'+ids[ind]).on('click',function() {
                $('#'+myBox).append('X');
            });

        }
    };

    return this;
}

