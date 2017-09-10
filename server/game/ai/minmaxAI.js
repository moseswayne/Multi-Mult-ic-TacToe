function MinMaxAI(horizon,sockRoom) {
    let socket = require('socket.io-client');
    const client = socket.connect(sockRoom);

    this.initiateAI = function() {
        client.on('post',function () {
            client.emit('play','I am here too');
        });


    };

    return this;
};

module.exports = function(difficulty,room) {
    var newBot = MinMaxAI(difficulty,room);
    return newBot;
};