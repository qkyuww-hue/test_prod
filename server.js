const express = require('express');
const app = express();
const PORT = 3000;

// In-memory tasks array
dlet tasks = [];

// GET /tasks - list all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - create a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const task = {
    id: Date.now(),
    title,
    status: 'todo',
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id - update a task
app.put('/tasks/:id', (req, res) => {
  const { title, status } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], title, status };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { tasks };