const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create Users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
`);

// Register endpoint
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  const query = `INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [firstName, lastName, email, hashedPassword, role], (err) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).send('Email already exists.');
      }
      return res.status(500).send('Error registering user.');
    }
    res.status(201).send('User registered successfully.');
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user in the database
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], async (err, user) => {
    if (err) {
      return res.status(500).send('Error logging in.');
    }
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials.');
    }

    res.status(200).send('Login successful.');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});