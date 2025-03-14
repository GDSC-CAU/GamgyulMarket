import React, { useState } from 'react';
import { Comment } from '../types';
import { formatDate } from '../utils/formatters';
import Button from './Button';
import { updateComment, deleteComment } from '../api/api';
import './CommentItem.css';

interface CommentItemProps {
  comment: Comment;
  articleId: number;
  onCommentUpdated: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, articleId, onCommentUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await updateComment(articleId, comment.comment_id, { content, password });
      setIsEditing(false);
      onCommentUpdated();
    } catch (err: any) {
      setError(err.response?.data?.error || '댓글 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await deleteComment(articleId, comment.comment_id, password);
      onCommentUpdated();
    } catch (err: any) {
      setError(err.response?.data?.error || '댓글 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="comment-item">
      {!isEditing && !isDeleting ? (
        <>
          <div className="comment-header">
            <p className="comment-content">{comment.content}</p>
            <div className="comment-actions">
              <button 
                onClick={() => setIsEditing(true)}
                className="comment-action-button comment-edit-button"
              >
                수정
              </button>
              <button 
                onClick={() => setIsDeleting(true)}
                className="comment-action-button comment-delete-button"
              >
                삭제
              </button>
            </div>
          </div>
          <p className="comment-date">{formatDate(comment.created_at)}</p>
        </>
      ) : isEditing ? (
        <form onSubmit={handleEdit} className="comment-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="comment-textarea"
            rows={3}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="comment-password-input"
            required
          />
          {error && <p className="comment-error">{error}</p>}
          <div className="comment-form-actions">
            <Button type="submit" isLoading={isLoading}>저장</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setContent(comment.content);
                setPassword('');
                setError('');
              }}
            >
              취소
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleDelete} className="comment-form">
          <p className="comment-delete-message">정말 이 댓글을 삭제하시겠습니까?</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="comment-password-input"
            required
          />
          {error && <p className="comment-error">{error}</p>}
          <div className="comment-form-actions">
            <Button type="submit" variant="danger" isLoading={isLoading}>삭제</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDeleting(false);
                setPassword('');
                setError('');
              }}
            >
              취소
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentItem; 