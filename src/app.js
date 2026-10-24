const express = require('express');

const app = express();
app.use(express.json());

const tasks = [];
let nextId = 1;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/tasks', (_req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Le titre de la tâche est obligatoire.',
    });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(task);

  return res.status(201).json(task);
});

module.exports = app;