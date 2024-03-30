document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        id: document.getElementById('id').value,
        fullName: document.getElementById('fullName').value,
        address: document.getElementById('address').value,
        status: document.getElementById('status').value,
    };

    fetch('https://code-sample-git-github-io.onrender.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('registrationForm').style.display = 'none'; // Hide the form
        const confirmationDiv = document.getElementById('confirmation');
        confirmationDiv.innerHTML = `
            <p>Registration Successful</p>
            <p>ID: ${data.id}</p>
            <p>Full Name: ${data.fullName}</p>
            <p>Address: ${data.address}</p>
            <p>Status: ${data.status}</p>
            <p>Fee: $${data.fee}</p>
        `;
        confirmationDiv.style.display = 'block'; // Show confirmation
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
