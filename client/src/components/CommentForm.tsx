import React, { useState } from 'react';
import Button from './Button';
import { createComment } from '../api/api';
import './CommentForm.css';

interface CommentFormProps {
  articleId: number;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await createComment(articleId, { content, password });
      setContent('');
      setPassword('');
      onCommentAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || '댓글 작성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="comment-form-container">
      <h3 className="comment-form-title">댓글 작성</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="comment-form-textarea"
            rows={3}
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (4-20자)"
            className="comment-form-input"
            minLength={4}
            maxLength={20}
            required
          />
        </div>
        {error && <p className="comment-form-error">{error}</p>}
        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
        >
          댓글 등록
        </Button>
      </form>
    </div>
  );
};

export default CommentForm; 