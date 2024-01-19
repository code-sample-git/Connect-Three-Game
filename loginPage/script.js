
function validatePassword() {
    var password = document.getElementById("password");
    var message = document.getElementById("message");

    // Reset styles and message
    password.className = '';
    message.textContent = '';

    if (password.value.length < 6) {
        password.className = 'error';
        message.textContent = 'Password must be at least 6 characters long.';
    } else {
        message.textContent = 'Success';
        message.style.color = 'green';
    }
}
