const { Article, Comment } = require('../models');
const { verifyPassword } = require('../utils/password');

/**
 * Middleware to authenticate article access using password
 */
const authenticateArticle = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const password = req.body.password;

    console.log('Request body:', req.body); // 디버깅용 로그
    console.log('Password received:', password); // 디버깅용 로그

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const article = await Article.findByPk(article_id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    console.log('Article password:', article.password); // 디버깅용 로그

    if (!verifyPassword(password, article.password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    req.article = article;
    next();
  } catch (error) {
    console.error('Authentication error:', error); // 디버깅용 로그
    next(error);
  }
};

/**
 * Middleware to authenticate comment access using password
 */
const authenticateComment = async (req, res, next) => {
  try {
    const { article_id, comment_id } = req.params;
    const password = req.body.password;

    console.log('Request body for comment:', req.body); // 디버깅용 로그
    console.log('Password received for comment:', password); // 디버깅용 로그

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const comment = await Comment.findOne({
      where: {
        id: comment_id,
        articleId: article_id
      }
    });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    console.log('Comment password:', comment.password); // 디버깅용 로그

    if (!verifyPassword(password, comment.password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    req.comment = comment;
    next();
  } catch (error) {
    console.error('Comment authentication error:', error); // 디버깅용 로그
    next(error);
  }
};

module.exports = {
  authenticateArticle,
  authenticateComment
}; 