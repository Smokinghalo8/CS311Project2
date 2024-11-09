import sqlite3 from 'sqlite3';
import path from 'path';
//using sqlite3 for database instead of vercel
//sorry professor


const dbPath = path.join(process.cwd(), 'flashcards.db'); //create database path

export default function handler(req, res) {
  const db = new sqlite3.Database(dbPath);

  if (req.method === 'GET') {
    //grab them flashcards
    db.all('SELECT * FROM flashcards', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failure to fetch the cards' });
      }
      res.status(200).json(rows);
    });
  }

  if (req.method === 'POST') {
    //Update the understood value and time
    const { id, amount_understood, time } = req.body;

    db.run(
      'UPDATE flashcards SET amount_understood = ?, time = ? WHERE id = ?',
      [amount_understood, time, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Failure to update Flashcards' });
        }
        res.status(200).json({ id, amount_understood, time });
      }
    );
  }

  db.close();
}
