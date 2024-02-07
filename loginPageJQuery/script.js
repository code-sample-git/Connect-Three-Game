
$(document).ready(function() {
    $("button").click(function() {
        var password = $("#password");
        var message = $("#message");

        // Reset styles and message
        password.removeClass('error');
        message.text('').css('color', 'red');

        if (password.val().length < 6) {
            password.addClass('error');
            message.text('Password must be at least 6 characters long.');
        } else {
            message.text('Success').css('color', 'green');
        }
    });
});
