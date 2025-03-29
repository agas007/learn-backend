const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const users = [ // Dummy data user
    { id: 1, username: 'admin', password: 'password123' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Cek apakah user ada di database (dummy user check)
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Generate token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;
