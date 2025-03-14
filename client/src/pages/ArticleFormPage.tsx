import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, createArticle, updateArticle, getImageUrl } from '../api/api';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './ArticleFormPage.css';

const ArticleFormPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const isEditMode = !!articleId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!isEditMode) return;
      
      try {
        const article = await getArticleById(parseInt(articleId));
        setTitle(article.title);
        setContent(article.content);
        setPrice(article.price.toString());
        setExistingImages(article.images || []);
      } catch (err: any) {
        setError(err.response?.data?.error || '게시물을 불러오는데 실패했습니다.');
      } finally {
        setFetchLoading(false);
      }
    };

    if (isEditMode) {
      fetchArticle();
    }
  }, [articleId, isEditMode]);

  useEffect(() => {
    // Create preview URLs for selected files
    const previews = images.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);

    // Cleanup function to revoke object URLs
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      // Limit to 5 images total (existing + new)
      const totalImages = existingImages.length + images.length + selectedFiles.length;
      if (totalImages > 5) {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
        return;
      }
      setImages(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isEditMode) {
        await updateArticle(parseInt(articleId), {
          title,
          content,
          price: parseInt(price),
          password,
          images: images.length > 0 ? images : undefined,
        });
        navigate(`/articles/${articleId}`);
      } else {
        const response = await createArticle({
          title,
          content,
          price: parseInt(price),
          password,
          images: images.length > 0 ? images : undefined,
        });
        navigate(`/articles/${response.article_id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '게시물 저장에 실패했습니다.');
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Layout>
        <div className="article-form-loading">
          <div className="article-form-spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="article-form-container">
        <div className="article-form-content">
          <h1 className="article-form-title">
            {isEditMode ? '게시물 수정' : '새 게시물 작성'}
          </h1>
          
          <form onSubmit={handleSubmit} className="article-form">
            <div className="article-form-group">
              <label htmlFor="title" className="article-form-label">
                제목
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="article-form-input"
                required
              />
            </div>
            
            <div className="article-form-group">
              <label htmlFor="price" className="article-form-label">
                가격
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="article-form-input"
                min="0"
                required
              />
            </div>
            
            <div className="article-form-group">
              <label htmlFor="content" className="article-form-label">
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="article-form-textarea"
                rows={8}
                required
              />
            </div>
            
            <div className="article-form-group">
              <label className="article-form-images-label">
                이미지 (최대 5개)
              </label>
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="article-form-images-section">
                  <p className="article-form-images-subtitle">기존 이미지:</p>
                  <div className="article-form-images-grid">
                    {existingImages.map((image, index) => (
                      <div key={index} className="article-form-image-container">
                        <img 
                          src={getImageUrl(image)} 
                          alt={`기존 이미지 ${index + 1}`} 
                          className="article-form-image"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="article-form-image-remove"
                          aria-label="이미지 삭제"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* New Images */}
              {previewImages.length > 0 && (
                <div className="article-form-images-section">
                  <p className="article-form-images-subtitle">새 이미지:</p>
                  <div className="article-form-images-grid">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="article-form-image-container">
                        <img 
                          src={preview} 
                          alt={`미리보기 ${index + 1}`} 
                          className="article-form-image"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="article-form-image-remove"
                          aria-label="이미지 삭제"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="article-form-image-upload">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/gif,image/jpg"
                  multiple
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={existingImages.length + images.length >= 5}
                >
                  이미지 선택
                </Button>
                <span className="article-form-image-count">
                  {existingImages.length + images.length}/5 이미지
                </span>
              </div>
            </div>
            
            <div className="article-form-group">
              <label htmlFor="password" className="article-form-label">
                비밀번호 (게시물 수정/삭제 시 필요)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="article-form-input"
                minLength={4}
                maxLength={20}
                required
              />
            </div>
            
            {error && (
              <div className="article-form-error">
                {error}
              </div>
            )}
            
            <div className="article-form-actions">
              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
              >
                {isEditMode ? '수정하기' : '등록하기'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleFormPage; 