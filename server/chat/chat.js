function chatBox () {
    var chatLog = [];

    //takes message and adds it to the chat log
    this.addMessage = function(clientData,message) {

    }

    this.getUpdatedLog = function() {
        return chatLog.slice();
    }
}