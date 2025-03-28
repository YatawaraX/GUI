import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Drop the existing users table (if it exists) to avoid duplicate column issues
db.run(`DROP TABLE IF EXISTS users`, (err) => {
    if (err) {
        console.error('Error dropping table:', err.message);
    } else {
        console.log('Dropped existing users table (if it existed).');
    }
});

// Create the users table with the correct schema
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Users table created successfully.');
    }
});

export default db;