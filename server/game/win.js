/**
 * Created by moses on 7/24/17.
 */
var Combinatorics = require('js-combinatorics');

function baseWin(gridSize,coordArr) {
    var setX = new Set();
    var setY = new Set();
    for (var i = 0; i<gridSize; i++) {
        setX.add(coordArr[i][0]);
        setY.add(coordArr[i][1]);
    }
    return ((setX.size == gridSize && setY.size == gridSize) ||
        (setX.size == 1 && setY.size == gridSize) ||
        (setY.size == 1 && setX.size == gridSize) ||
        (setX.size == 1 && setY.size == 1) ||
        (setY.size == 1 && setX.size == 1));
}

function checkWin(dimensions,gridSize,coords) {
    var win = true;
    var dimArr = [];//Array.from(new Array(dimensions), (val,index) => index);
    for(var i = 0;i<dimensions;i++){
        dimArr[i]=i;
    }
    console.log(dimensions);
    console.log(dimArr);
    var combos = Combinatorics.combination(dimArr,2);
    console.log(combos);
    var d;
    while(d = combos.next()) {
        console.log(d);
        coordArr = [];
        for(var i = 0; i<gridSize; i++) {
            //console.log(combos[i]);
            coordArr.push([coords[i][d[0]],coords[i][d[1]]]);
        }
        //console.log(coordArr);
        win = (win && baseWin(gridSize,coordArr));
        //console.log(win);
    }
    return win;
}
//get combinatorics of gridSize-1 and then tack on the new move to each group to check for the win
function winGame(coordinates,move,gridSize,dimensions) {
    //check = coordinates.filter(x => !move.includes(x));
    if(coordinates.length<gridSize-1) {
        return false;
    }
    var combos = Combinatorics.bigCombination(coordinates,gridSize-1);
    winBool = false;
    var check;
    while(check = combos.next()) {
        var group = check.slice();
        group.push(move);
        console.log(group);
        winBool = (winBool || checkWin(dimensions,gridSize,group));
    }
    return winBool;
}

module.exports = winGame;
// var myArr = [[0,0,0,1],[1,0,1,1]];
// var empty = [2,0,2,2];
// var myWin = (winGame(myArr,empty,3,4));
// console.log(myWin);
// var check = [[0,0],[0,1],[0,2]];
// console.log(baseWin(3,check));