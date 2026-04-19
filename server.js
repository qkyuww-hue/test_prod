const express = require('express');
const app = express();
const PORT = 3000;

// In-memory tasks array
let tasks = [];

// GET /tasks - list all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - create a task
app.post('/tasks', (req, res) => {
  const { title, status = 'todo' } = req.body;
  tasks.push({ id: Date.now(), title, status });
  res.json({ task: { id: Date.now(), title, status } });
});

// PUT /tasks/:id - update a task
app.put('/tasks/:id', (req, res) => {
  const { title, status } = req.body;
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.title = title;
  task.status = status;
  res.json(task);
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
