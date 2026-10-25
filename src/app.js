const express = require('express');
const { pool } = require('./db');

const app = express();
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({ status: 'ok', database: 'connected' });
  } catch {
    return res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/tasks', async (_req, res) => {
  const result = await pool.query(
    'SELECT id, title, completed, created_at FROM tasks ORDER BY id'
  );

  return res.status(200).json(result.rows);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Le titre de la tâche est obligatoire.',
    });
  }

  const result = await pool.query(
    `INSERT INTO tasks (title)
     VALUES ($1)
     RETURNING id, title, completed, created_at`,
    [title.trim()]
  );

  return res.status(201).json(result.rows[0]);
});

module.exports = app;