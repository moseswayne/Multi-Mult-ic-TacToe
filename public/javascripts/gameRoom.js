const socket = io(window.location.pathname);
var typingList = [];
var guiBoard;

$(function(){

    guiBoard = uiBoard($('#game_screen'),socket);
    $('#submit').click(function() {
        socket.emit('play',$('#move').val());
    });

    $('#num_players').change(function(){
        socket.emit('setNum',$('#num_players').find(":selected").text());
    });

    $('#dimensions').change(function(){
        socket.emit('setDim',$('#num_players').find(":selected").text());
    });

    $('#change_name').click(function() {
        socket.emit('name',$('#player_name').val());
    });

    for (var i = 2; i<11; i++) {
        var option = $('<option></option>').attr("value", i).text(""+i);
        $("#dimensions").append(option);
    }

    for (var i = 2; i<21; i++) {
        var option = $('<option></option>').attr("value", i).text(""+i);
        $("#grid").append(option);
    }

    $('#start').click(function() {
        let size = $('#grid').val();
        let dim = $('#dimensions').val();
        let gameParams = {
            boardSize: size,
            dimensions: dim
        };
        socket.emit('start',gameParams);
    });


    var chatClient = Chatter(socket,$('#chat_box'),$('#chat_submit'),$('#chat_type'),$('#chat_screen'));


});


function playerNumUpdate(newNum) {
    let oldSel = $('#num_players').find(":selected").text();
    $("#num_players").empty();
    for (var i = newNum; i<20; i++) {
        var option = $('<option></option>').attr("value", i).text(""+i);
        $("#num_players").append(option);
    }
    if(Number(oldSel) >= newNum) {
        $("#num_players").val(oldSel);
    } else {
        $("#num_players").val(""+newNum);
    }
}

function playerPanelUpdate(playData) {
    $('#player_panel').empty();
    var player;
    for(player in playData) {
        $('#player_panel').append("Name: "+playData[player].name+"<br>");
        $('#player_panel').append("Token: "+playData[player].token+"<br>");
        $('#player_panel').append("Wins: "+playData[player].wins+"<br>");
        $('#player_panel').append('<br>');
    }
}

socket.on('playJoin', function(data) {
    playerNumUpdate(data.max_play);
    playerPanelUpdate(data.game_data);
});

socket.on('post',function (info) {
    $("#chat").append("<p>"+info+"</p>");
});

socket.on('newNum', function(newNum) {
    $("#num_players").val(""+newNum);
});

socket.on('updatePlayers', function (playData) {
    playerPanelUpdate(playData);
});

socket.on('heart', function(data){
    socket.emit('beat', {beat: 1});
});

socket.on('initGame',function(gameData) {
    guiBoard.initializeBoard(gameData.boardSize,gameData.dimensions);
});

socket.on('updateWin',function(playerData) {
    playerPanelUpdate(playerData);
});

socket.on('win',function () {
    alert("You won!");
});

socket.on('lose',function () {
    alert("You lost :(");
});

socket.on('postMove',function(play) {
    guiBoard.playPiece(play.move,play.token);
});

socket.on('enable',function() {
    //Say it's your move! Start a timer
    guiBoard.flipTurn(true);
    $('#yourTurn').append('Your Turn');
});

socket.on('disable',function() {
    guiBoard.flipTurn(false);
    $('#yourTurn').empty();
});

socket.on('over',function(winCoord) {
    var i;
    for(i in winCoord) {
        $('#'+(winCoord[i].join('x'))).css('background-color','#f28f7d');
    }
});