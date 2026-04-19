export function validateTaskTitle(req, res, next) {
  const { title } = req.body;
  const trimmedTitle = title?.trim();

  if (!trimmedTitle) {
    return res.status(400).json({
      error: 'Title is required',
      details: 'Please provide a non-empty title for the task'
    });
  }

  req.body.title = trimmedTitle;
  next();
}