function Chatter(sock,entryBox,submitButton,typeDiv,chatBox) {

    var socket = sock;
    var entry = entryBox;
    var submit = submitButton;
    var type = typeDiv;
    var chat = chatBox;
    var typerList = [];

    var postMessage = function() {

    };

    var playerTyping = function() {
        if(typerList.length<1) {
            return;
        }
        type.empty();
        var player = typerList[0];
        var playStr = player+' is ';
        if(typerList.length>1) {
            let temp = typerList.join(', ');
            playStr = temp+' and '+player+' are ';
        }
        type.append(playStr+'typing');
    };

    socket.on('typing',function(playerName) {
        typerList.push(playerName);
        playerTyping();
    });

    socket.on('')
}