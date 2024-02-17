
function verifyAge() {
    //Disable the button and input
    document.getElementById('verifyButton').disabled = true;
    document.getElementById('userAge').disabled = true;

    //Update the message
    document.getElementById('message').textContent = "Result will be displayed here in 3 seconds. Please wait...";
    const age = document.getElementById('userAge').value;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //Wait 3 seconds before checking the age        
            if (age >= 18) {
                resolve("Adult");
            } else {
                reject("Only adult can visit this page");
            }
        }, 3000);
    })
    .then(result => {
        document.getElementById('message').textContent = result;
    })
    .catch(error => {
        document.getElementById('message').textContent = error;
    })
    .finally(() => {
        //Enable the button and input
        document.getElementById('verifyButton').disabled = false;
        document.getElementById('userAge').disabled = false;
    });
}
