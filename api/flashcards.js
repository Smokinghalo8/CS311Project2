// api/flashcards.js
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'flashcards.db');

export default function handler(req, res) {
  const db = new sqlite3.Database(dbPath);

  if (req.method === 'GET') {
    // Fetch all flashcards
    db.all('SELECT * FROM flashcards', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch flashcards' });
      }
      res.status(200).json(rows);
    });
  }

  if (req.method === 'POST') {
    // Update flashcard's understanding and time after review
    const { id, amount_understood, time } = req.body;

    db.run(
      'UPDATE flashcards SET amount_understood = ?, time = ? WHERE id = ?',
      [amount_understood, time, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update flashcard' });
        }
        res.status(200).json({ id, amount_understood, time });
      }
    );
  }

  db.close();
}
