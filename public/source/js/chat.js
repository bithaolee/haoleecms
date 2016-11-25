var socket = io.connect('http://localhost:3000');

var $messageBox = $('.direct-chat-messages');
var $form = $('.input-group');
var $btnSend = $form.find('.btn-send');
var $message = $form.find('input[name="message"]');

function wrapMessage(message, isSelf) {
    var messageTemp = '<div class="direct-chat-msg {{class}}">\
        <div class="direct-chat-info clearfix">\
          <span class="direct-chat-name pull-right">anonymous</span>\
          <span class="direct-chat-timestamp pull-left">{{time}}</span>\
        </div>\
        <img class="direct-chat-img" src="/libs/admin/img/user2-160x160.jpg" alt="Message User Image">\
        <div class="direct-chat-text">\
          {{message}}\
        </div>\
    </div>';
    var className = (typeof(isSelf) === 'undefined' || !isSelf) ? '' : 'right';
    messageTemp = messageTemp.replace('{{class}}', className);
    messageTemp = messageTemp.replace('{{time}}', new Date());
    messageTemp = messageTemp.replace('{{message}}', message);
    return messageTemp;
}

function submitMessage() {
    var message = $message.val();
    if (message !== '') {
        $messageBox.append(wrapMessage(message, true));
        socket.emit('chat', message);
    }
}

$message.on('keydown', function (e) {
    if (e.keyCode === 13) {
        submitMessage();
    }
});

$btnSend.on('click', function (e) {
    e.preventDefault();
    submitMessage();
});

socket.on('chat', function (data) {
    $messageBox.append(wrapMessage(data));
});
