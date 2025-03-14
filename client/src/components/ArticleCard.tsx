import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { formatPrice, formatDate, truncateText } from '../utils/formatters';
import { getImageUrl } from '../api/api';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link 
      to={`/articles/${article.article_id}`}
      className="article-card"
    >
      <div className="article-card-image-container">
        {article.thumbnail_url || article.images?.[0] ? (
          <img 
            src={getImageUrl(article.thumbnail_url || article.images[0])} 
            alt={article.title}
            className="article-card-image"
          />
        ) : (
          <div className="article-card-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {article.status === 'sold' && (
          <div className="article-card-sold-overlay">
            <span className="article-card-sold-text">판매완료</span>
          </div>
        )}
      </div>
      <div className="article-card-content">
        <h3 className="article-card-title">
          {truncateText(article.title, 30)}
        </h3>
        <p className="article-card-price">
          {formatPrice(article.price)}
        </p>
        <div className="article-card-footer">
          <span className="article-card-date">{formatDate(article.created_at)}</span>
          {article.location && (
            <span className="article-card-location">
              <svg xmlns="http://www.w3.org/2000/svg" className="article-card-location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {article.location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard; 