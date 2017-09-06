var socket = io.connect();

$(function(){
    $('#jSubmit').click(function() {
        socket.emit('joinRoom',$('#join').val());
    })
    $('#something').click(function() {
        socket.emit('something');//;$('#join').val());
    })
});