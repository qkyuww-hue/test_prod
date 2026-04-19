# Task Tracker API Reference

## Endpoints

### GET /tasks
Returns all tasks as JSON array.

### POST /tasks
Creates a new task. Body: { "title": "string" }. Returns created task with id and status "todo".

### PUT /tasks/:id
Updates a task. Body: { "title": "string", "status": "string" }.

### DELETE /tasks/:id
Deletes a task by ID.

## Error Handling
- 400: Invalid input (missing title)
- 404: Task not found