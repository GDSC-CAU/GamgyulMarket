const { Article, Comment } = require('../models');
const { validatePassword } = require('../utils/password');

/**
 * Create a new article
 */
const createArticle = async (req, res, next) => {
  try {
    const { title, content, price, password, images } = req.body;

    // Validate required fields
    if (!title || !content || !price || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Invalid password format. Password must be at least 4 characters long.' });
    }

    // Create article
    const article = await Article.create({
      title,
      content,
      price,
      password,
      images: images || []
    });

    res.status(201).json({ article_id: article.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all articles with pagination
 */
const getArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;
    const offset = (page - 1) * size;

    const { count, rows } = await Article.findAndCountAll({
      attributes: ['id', 'title', 'price', 'createdAt', 'images'],
      limit: size,
      offset,
      order: [['createdAt', 'DESC']]
    });

    // Format response
    const articles = rows.map(article => {
      const images = article.images;
      return {
        article_id: article.id,
        title: article.title,
        price: article.price,
        created_at: article.createdAt,
        thumbnail_url: images && images.length > 0 ? images[0] : null
      };
    });

    const totalPages = Math.ceil(count / size);

    res.status(200).json({
      articles,
      total_count: count,
      total_pages: totalPages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get article by ID with comments
 */
const getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    const article = await Article.findByPk(article_id, {
      include: [{
        model: Comment,
        as: 'comments',
        attributes: ['id', 'content', 'createdAt']
      }]
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Format response
    const formattedArticle = {
      article_id: article.id,
      title: article.title,
      content: article.content,
      price: article.price,
      created_at: article.createdAt,
      images: article.images,
      comments: article.comments.map(comment => ({
        comment_id: comment.id,
        content: comment.content,
        created_at: comment.createdAt
      }))
    };

    res.status(200).json(formattedArticle);
  } catch (error) {
    next(error);
  }
};

/**
 * Update article by ID
 */
const updateArticle = async (req, res, next) => {
  try {
    const article = req.article; // From middleware
    const { title, content, price, images } = req.body;

    // Update fields if provided
    if (title !== undefined) article.title = title;
    if (content !== undefined) article.content = content;
    if (price !== undefined) article.price = price;
    if (images !== undefined) article.images = images;

    await article.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Delete article by ID
 */
const deleteArticle = async (req, res, next) => {
  try {
    const article = req.article; // From middleware
    await article.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
}; 