var socket = io.connect();

$(function(){
    $('#submit').click(function() {
        socket.emit('play',$('#move').val());
    })


});