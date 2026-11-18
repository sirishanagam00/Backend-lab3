
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();

app.use(express.json());

const JWT_SECRET = 'my_lab4_secret_key';

// REGISTER API
app.post('/register', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {
        db.get(
            'SELECT * FROM users WHERE username = ?',
            [username],
            async (err, user) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Database error'
                    });
                }

                if (user) {
                    return res.status(400).json({
                        message: 'Username already exists'
                    });
                }

                try {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    db.run(
                        `INSERT INTO users (username, name, password)
                         VALUES (?, ?, ?)`,
                        [username, name, hashedPassword],
                        function (err) {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Registration failed'
                                });
                            }

                            res.status(201).json({
                                message: 'Registration successful',
                                userId: this.lastID
                            });
                        }
                    );
                } catch (error) {
                    res.status(500).json({
                        message: 'Password hashing failed'
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// LOGIN API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (!user) {
                return res.status(400).json({
                    message: 'Invalid username or password'
                });
            }

            try {
                const isPasswordCorrect = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    return res.status(400).json({
                        message: 'Invalid username or password'
                    });
                }

                const token = jwt.sign(
                    { username: user.username },
                    JWT_SECRET
                );

                res.status(200).json({
                    jwt_token: token
                });
            } catch (error) {
                res.status(500).json({
                    message: 'Login failed'
                });
            }
        }
    );
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
