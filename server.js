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
  res.status(201).json(tasks);
});

// PUT /tasks/:id - update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.title = title;
  task.status = status;
  res.json(task);
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(tasks.indexOf(task), 1);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
