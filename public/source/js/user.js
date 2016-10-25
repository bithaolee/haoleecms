require('blockui');
require('jqueryform');
require('jqueryvalidate');

var $form = $('form'),
    $username = $form.find('input[name="username"]'),
    $password = $form.find('input[name="password"]'),
    $error = $form.find('.error');

$.validator.addMethod('password', function (value, $element) {
    var regex = /^[0-9a-zA-Z_]{6,15}$/;
    return regex.test(value);
}, '请输入6-15位数字字母下划线组合');

$form.validate({
    // debug: true,
    errorElement: 'span',
    errorClass: 'text-danger',
    errorPlacement: function (error, $element) {
        error.appendTo($element.parent());
    },
    submitHandler: function (form) {
        $error.hide();
        $.blockUI({
            message: '<div class="overlay"><i class="fa fa-refresh fa-spin"></i> Loading...</div>',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: 0.5,
                color: '#fff'
            }
        });
        $(form).ajaxSubmit({
            success: function (res) {
                $.unblockUI();
                if (res.code == 200) {
                    window.location.href = '/admin/index';
                } else {
                    $error.empty();
                    $error.append('<i class="fa fa-times-circle-o"></i>' + res.message);
                    $error.show();
                }
            },
            error: function () {
                $.unblockUI();
                $error.empty();
                $error.append('<i class="fa fa-times-circle-o"></i>网络错误');
                $error.show();
            }
        });
    },
});
