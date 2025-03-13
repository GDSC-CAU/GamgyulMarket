const { Comment, Article } = require('../models');
const { validatePassword } = require('../utils/password');

/**
 * Create a new comment
 */
const createComment = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { content, password } = req.body;

    // Validate required fields
    if (!content || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Invalid password format. Password must be at least 4 characters long.' });
    }

    // Check if article exists
    const article = await Article.findByPk(article_id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Create comment
    const comment = await Comment.create({
      articleId: article_id,
      content,
      password
    });

    res.status(201).json({ comment_id: comment.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Update comment by ID
 */
const updateComment = async (req, res, next) => {
  try {
    const comment = req.comment; // From middleware
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    comment.content = content;
    await comment.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Delete comment by ID
 */
const deleteComment = async (req, res, next) => {
  try {
    const comment = req.comment; // From middleware
    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment
}; 