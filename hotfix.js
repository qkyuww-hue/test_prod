module.exports = {
  validateTaskInput: function(req, res, next) {
    const { title } = req.body;
    
    // Check if title exists and is a non-empty string
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }
    
    // Validation passed
    req.body.title = title.trim();
    next();
  }
};