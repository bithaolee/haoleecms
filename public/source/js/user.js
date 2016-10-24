require('blockui');
require('jqueryform');

var $form = $('form'),
    $username = $form.find('input[name="username"]'),
    $password = $form.find('input[name="password"]');

$form.on('submit', function () {
    if ($username.val() === '') {

        return false;
    }

    if ($password.val() === '') {

        return false;
    }

    $.blockUI({message: '<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>'});
    // $.ajax({
    //     url: '/admin/user/authentication',
    //     type: 'POST',
    //     dataType: 'json',
    //     success: function (res) {

    //     },
    //     error: function () {
    //         $.unblockUI();
    //     }
    // });

    $(this).ajaxSubmit({
        success: function () {
            $.unblockUI();
        },
        error: function () {
            // $.unblockUI();
        }
    });
    return false;
});
