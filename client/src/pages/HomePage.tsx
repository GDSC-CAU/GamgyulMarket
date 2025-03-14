import React, { useState, useEffect } from 'react';
import { getArticles } from '../api/api';
import { Article } from '../types';
import Layout from '../components/Layout';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getArticles(currentPage);
        setArticles(response.articles);
        setTotalPages(response.total_pages);
      } catch (err: any) {
        setError(err.response?.data?.error || '게시물을 불러오는데 실패했습니다.');
        console.error('Failed to fetch articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="home-container">
        <div className="home-header">
          <div>
            <h1 className="home-title">중고 상품 목록</h1>
            <p className="home-subtitle">다양한 중고 상품을 둘러보세요</p>
          </div>
          <div className="home-search-container">
            <input
              type="text"
              placeholder="상품 검색..."
              className="home-search-input"
            />
            <div className="home-search-icon-container">
              <svg className="home-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="home-loading-container">
            <div className="home-loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="home-error-container">
            <div className="home-error-content">
              <svg className="home-error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="home-empty-container">
            <svg className="home-empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="home-empty-title">등록된 상품이 없습니다</h3>
            <p className="home-empty-message">첫 번째 상품을 등록해보세요!</p>
          </div>
        ) : (
          <div className="home-articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        )}
        
        {!isLoading && articles.length > 0 && (
          <div className="home-pagination-container">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage; 