import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getArticleById, deleteArticle, getImageUrl } from '../api/api';
import { Article } from '../types';
import Layout from '../components/Layout';
import Button from '../components/Button';
import CommentItem from '../components/CommentItem';
import CommentForm from '../components/CommentForm';
import { formatPrice, formatDate } from '../utils/formatters';
import './ArticleDetailPage.css';

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchArticle = async () => {
    if (!articleId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await getArticleById(parseInt(articleId));
      setArticle(data);
    } catch (err: any) {
      setError(err.response?.data?.error || '게시물을 불러오는데 실패했습니다.');
      console.error('Failed to fetch article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleId) return;
    
    setDeleteError(null);
    try {
      await deleteArticle(parseInt(articleId), password);
      navigate('/');
    } catch (err: any) {
      setDeleteError(err.response?.data?.error || '게시물 삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="article-detail-loading">
          <div className="article-detail-spinner"></div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="article-detail-error">
          {error || '게시물을 찾을 수 없습니다.'}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="article-detail-container">
        {/* Article Header */}
        <div className="article-detail-header">
          <div className="article-detail-header-content">
            <h1 className="article-detail-title">{article.title}</h1>
            <div className="article-detail-actions">
              <Link 
                to={`/articles/${article.article_id}/edit`}
                className="article-detail-action-link"
              >
                수정
              </Link>
              <button 
                onClick={() => setIsDeleting(true)}
                className="article-detail-action-button"
              >
                삭제
              </button>
            </div>
          </div>
          <p className="article-detail-date">{formatDate(article.created_at)}</p>
          <p className="article-detail-price">{formatPrice(article.price)}</p>
        </div>

        {/* Image Gallery */}
        {article.images && article.images.length > 0 && (
          <div className="article-detail-gallery">
            <div className="article-detail-main-image-container">
              <img 
                src={getImageUrl(article.images[activeImageIndex])} 
                alt={`${article.title} - 이미지 ${activeImageIndex + 1}`}
                className="article-detail-main-image"
              />
            </div>
            {article.images.length > 1 && (
              <div className="article-detail-thumbnails">
                {article.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`article-detail-thumbnail-button ${
                      index === activeImageIndex ? 'article-detail-thumbnail-button-active' : ''
                    }`}
                  >
                    <img 
                      src={getImageUrl(image)} 
                      alt={`썸네일 ${index + 1}`}
                      className="article-detail-thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="article-detail-content">
          <div className="article-detail-text">
            {article.content}
          </div>
        </div>

        {/* Delete Confirmation */}
        {isDeleting && (
          <div className="article-detail-delete-section">
            <h3 className="article-detail-delete-title">게시물 삭제</h3>
            <p className="article-detail-delete-message">이 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <form onSubmit={handleDelete} className="article-detail-delete-form">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="article-detail-delete-input"
                  required
                />
              </div>
              {deleteError && <p className="article-detail-delete-error">{deleteError}</p>}
              <div className="article-detail-delete-actions">
                <Button type="submit" variant="danger">삭제</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDeleting(false);
                    setPassword('');
                    setDeleteError(null);
                  }}
                >
                  취소
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Comments Section */}
        <div className="article-detail-comments">
          <h2 className="article-detail-comments-title">댓글 {article.comments?.length || 0}개</h2>
          
          {/* Comment Form */}
          <CommentForm 
            articleId={article.article_id} 
            onCommentAdded={fetchArticle} 
          />
          
          {/* Comments List */}
          <div className="article-detail-comments-list">
            {article.comments && article.comments.length > 0 ? (
              article.comments.map((comment) => (
                <CommentItem 
                  key={comment.comment_id} 
                  comment={comment} 
                  articleId={article.article_id}
                  onCommentUpdated={fetchArticle}
                />
              ))
            ) : (
              <p className="article-detail-no-comments">아직 댓글이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetailPage; 