/**
 * Created by moses on 7/24/17.
 */
var Combinatorics = require('js-combinatorics');

function multiSort(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function baseWin(gridSize,coordArr) {
    coordArr.sort(multiSort);
    var setX = new Set();
    var setY = new Set();
    var forDiag = true;
    var backDiag = true;
    setX.add(coordArr[0][0]);
    setY.add(coordArr[0][1]);
    for (var i = 1; i<gridSize; i++) {
        setX.add(coordArr[i][0]);
        setY.add(coordArr[i][1]);
        forDiag = forDiag && (coordArr[i][1]>coordArr[i-1][1]);
        backDiag = backDiag && (coordArr[i][1]<coordArr[i-1][1]);
    }
    let diagBool = (setX.size == gridSize && setY.size == gridSize);
    // let forDiag = (diag == gridSize);
    // let backDiag = (diag == ((gridSize%2==0)?0:1)) && diagBool;
    return ((forDiag && diagBool) ||
        (backDiag && diagBool) ||
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
    var winBool = false;
    var check;
    var nullWin = null;
    while(check = combos.next()) {
        var group = check.slice();
        group.push(move);
        console.log(group);
        let possWin = checkWin(dimensions,gridSize,group);
        if(possWin) {
            nullWin = group;
        }
        winBool = (winBool || possWin);
    }
    var retObj = {
        win:winBool,
        condition:nullWin
    }
    return retObj;
}

module.exports = winGame;
// var myArr = [[0,1,3],[1,2,1],[2,0,2]];
// var empty = [3,3,0];
// var myWin = (winGame(myArr,empty,4,3));
// console.log(myWin);
// var check = [[0,0],[0,1],[0,2]];
//console.log(baseWin(3,check));