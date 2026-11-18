
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get the exact database location
const dbPath = path.join(__dirname, 'users.db');

console.log('DATABASE LOCATION:', dbPath);

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create users table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Table creation failed:', err.message);
        } else {
            console.log('Users table created successfully');
        }
    });
});

module.exports = db;
