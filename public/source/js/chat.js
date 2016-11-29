var socket = io.connect('http://localhost:3000');

var $messageBox = $('.direct-chat-messages');
var $form = $('.input-group');
var $btnSend = $form.find('.btn-send');
var account = $btnSend.data('account');
var $message = $form.find('input[name="message"]');

function wrapMessage(message, user, isSelf) {
    var messageTemp = '<div class="direct-chat-msg {{class}}">\
        <div class="direct-chat-info clearfix">\
          <span class="direct-chat-name pull-right">{{user}}</span>\
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
    messageTemp = messageTemp.replace('{{user}}', user);
    return messageTemp;
}

function submitMessage() {
    var message = $message.val();
    if (message !== '') {
        $messageBox.append(wrapMessage(message, account, true));
        $messageBox.animate({scrollTop:$messageBox.get(0).scrollHeight}, 300);
        socket.emit('chat', message);
        $message.val('');
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
    $messageBox.append(wrapMessage(data.data, data.user, data.user === account));
    $messageBox.animate({scrollTop:$messageBox.get(0).scrollHeight}, 300);
});
