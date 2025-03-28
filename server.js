import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors'; // Import CORS middleware
import db from './database.js';

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Register a new user
app.post('/register', (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const query = `INSERT INTO users (firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [firstname, lastname, email, username, hashedPassword], (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Email or username already exists' });
                }
                return res.status(500).json({ error: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login a user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching user' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        });
    });
});

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Bus Ticket Booking API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});