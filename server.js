const express = require('express');
const app = express();
const PORT = 3000;

// In-memory tasks array
const tasks = [];

// GET /tasks - list all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - create a task (title, status defaults to "todo")
app.post('/tasks', (req, res) => {
  const { title, status = 'todo' } = req.body;
  tasks.push({ id: Date.now().toString(), title, status });
  res.status(201).json({ task: { id: Date.now().toString(), title, status } });
});

// PUT /tasks/:id - update a task
app.put('/tasks/:id', (req, res) => {
  const { title, status } = req.body;
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.title = title || task.title;
  task.status = status || task.status;
  res.json({ task });
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(tasks.indexOf(task), 1);
  res.json({ task: task });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
