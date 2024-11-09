// setupDatabase.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'flashcards.db');

// Ensure the database file exists
if (!fs.existsSync(dbPath)) {
  const db = new sqlite3.Database(dbPath);

  // Create the table for storing flashcards
  db.serialize(() => {
    db.run(`
      CREATE TABLE flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        amount_understood INTEGER DEFAULT 0,
        time INTEGER DEFAULT 0
      )
    `);

    // Add some sample flashcards data
    const stmt = db.prepare("INSERT INTO flashcards (question, answer) VALUES (?, ?)");
    stmt.run("What is the capital of France?", "Paris");
    stmt.run("What is the largest ocean on Earth?", "Pacific Ocean");
    stmt.run("What is the chemical symbol for water?", "H2O");
    stmt.finalize();
  });

  db.close();
  console.log("Database initialized!");
} else {
  console.log("Database already exists.");
}
