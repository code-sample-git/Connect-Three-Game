const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', (req, res) => {
    const { id, fullName, address, status } = req.body;
    let fee = 0;
    if (status === 'student') fee = 10;
    else if (status === 'staff') fee = 50;
    // Volunteers have a fee of 0 by default

    res.json({
        message: "Registration Successful",
        id,
        fullName,
        address,
        status,
        fee
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
