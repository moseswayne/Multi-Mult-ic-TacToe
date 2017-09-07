const socket = io(window.location.pathname);

$(function(){
    $('#submit').click(function() {
        socket.emit('play',$('#move').val());
    })


});

socket.on('post',function (info) {
    $("#chat").append("<p>"+info+"</p>");
});