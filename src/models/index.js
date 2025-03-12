const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false
});

// Import models
const Article = require('./article.model')(sequelize);
const Comment = require('./comment.model')(sequelize);

// Define associations
Article.hasMany(Comment, { 
  foreignKey: 'articleId',
  as: 'comments',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Article, { 
  foreignKey: 'articleId',
  as: 'article'
});

module.exports = {
  sequelize,
  Article,
  Comment
}; 