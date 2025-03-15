const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'searchengine.db'), { verbose: console.log });

// Create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS search_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        url TEXT UNIQUE NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;