const socket = io(window.location.pathname);
var typingList = [];

$(function(){
    $('#submit').click(function() {
        socket.emit('play',$('#move').val());
    });

    $('#ai').click(function() {
        socket.emit('addAI');
    });

    $('#num_players').change(function(){
        socket.emit('setNum',$('#num_players').find(":selected").text());
    });

    $('#dimensions').change(function(){
        socket.emit('setDim',$('#num_players').find(":selected").text());
    });

});

function postMessage() {
    $()
}

function playerTyping() {

}

function playerNumUpdate(newNum) {
    let oldSel = $('#num_players').find(":selected").text();
    $("#num_players").empty();
    console.log("pls");
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