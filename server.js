const express = require('express');
const app = express();
const PORT = 3000;

// In-memory tasks array
const tasks = [];

// GET /tasks — list all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks — create a task (title, status defaults to "todo")
app.post('/tasks', (req, res) => {
  const { title, status = 'todo' } = req.body;
  const task = { id: Date.now(), title, status };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id — update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.title = title || task.title;
  task.status = status || task.status;
  res.json(task);
});

// DELETE /tasks/:id — delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id == id);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(taskIndex, 1);
  res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
