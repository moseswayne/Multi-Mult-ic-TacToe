var socket = io.connect();

$(function(){
    $('#jSubmit').click(function() {
        var roomName = $('#join').val();
        socket.emit('joinRoom',roomName);
        window.location.href = roomName;
    })
});