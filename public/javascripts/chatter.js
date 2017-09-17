function Chatter(sock,entryBox,submitButton,typeDiv,chatBox) {

    var socket = sock;
    var entry = entryBox;
    var submit = submitButton;
    var type = typeDiv;
    var chat = chatBox;
    var typerList = [];

    var postMessage = function(msgData) {
        var posted = '('+msgData.date+') '+msgData.user+': \t'+msgData.msg;
        chat.append(posted+'<br>');
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

    var sendMsg = function(message) {
        socket.emit('chat_send',message);
    };

    submit.click(function() {
        if(entry.val().length<1) {
            return;
        }

        sendMsg(entry.val());
        entry.val('');
    });

    entry.on("change paste keyup", function() {
        if(entry.val().length<1) {
            socket.emit('end_type');
        } else {
            socket.emit('chat_type');
        }
    });

    socket.on('typing',function(playerName) {
        if(typerList.contains(playerName)) {
            return;
        }
        typerList.push(playerName);
        playerTyping();
    });

    socket.on('no_typing',function(playerName) {
        var ind = typerList.indexOf(playerName);
        if (ind > -1) {
            typerList.splice(ind, 1);
        }
        type.empty();
        playerTyping();
    });

    socket.on('chat_post',function(data) {
        postMessage(data);
    });
}