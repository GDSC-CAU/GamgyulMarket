import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-wrapper">
          <div className="header-logo-wrapper">
            <Link to="/" className="header-logo">
              <span className="header-logo-text">감귤마켓</span>
            </Link>
            <nav className="header-nav">
              <div className="header-nav-list">
                <Link 
                  to="/" 
                  className={`header-nav-link ${
                    location.pathname === '/' 
                      ? 'header-nav-link-active' 
                      : 'header-nav-link-inactive'
                  }`}
                >
                  홈
                </Link>
                <Link 
                  to="/categories" 
                  className={`header-nav-link ${
                    location.pathname.startsWith('/categories') 
                      ? 'header-nav-link-active' 
                      : 'header-nav-link-inactive'
                  }`}
                >
                  카테고리
                </Link>
                <Link 
                  to="/search" 
                  className={`header-nav-link ${
                    location.pathname.startsWith('/search') 
                      ? 'header-nav-link-active' 
                      : 'header-nav-link-inactive'
                  }`}
                >
                  검색
                </Link>
              </div>
            </nav>
          </div>
          <div className="header-actions">
            <div className="header-actions-list">
              <Link
                to="/articles/new"
                className="button button-primary button-md button-rounded-lg"
              >
                글쓰기
              </Link>
              <Link
                to="/my-page"
                className="button button-outline button-md button-rounded-lg"
              >
                마이페이지
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="header-mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">메뉴 열기</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="header-mobile-menu">
          <div className="header-mobile-menu-list">
            <div className="header-mobile-menu-item">
              <Link
                to="/"
                className={`header-mobile-menu-link ${
                  location.pathname === '/' 
                    ? 'header-nav-link-active' 
                    : 'header-nav-link-inactive'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
            </div>
            <div className="header-mobile-menu-item">
              <Link
                to="/categories"
                className={`header-mobile-menu-link ${
                  location.pathname.startsWith('/categories') 
                    ? 'header-nav-link-active' 
                    : 'header-nav-link-inactive'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                카테고리
              </Link>
            </div>
            <div className="header-mobile-menu-item">
              <Link
                to="/search"
                className={`header-mobile-menu-link ${
                  location.pathname.startsWith('/search') 
                    ? 'header-nav-link-active' 
                    : 'header-nav-link-inactive'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                검색
              </Link>
            </div>
            <div className="header-mobile-menu-item">
              <Link
                to="/articles/new"
                className="header-mobile-menu-link header-mobile-menu-link-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                글쓰기
              </Link>
            </div>
            <div className="header-mobile-menu-item">
              <Link
                to="/my-page"
                className="header-mobile-menu-link header-mobile-menu-link-outline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                마이페이지
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 