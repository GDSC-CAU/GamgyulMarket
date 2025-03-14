import React from 'react';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <div className="layout-container">
          {children}
        </div>
      </main>
      <footer className="layout-footer">
        <div className="layout-footer-container">
          <div className="layout-footer-grid">
            <div>
              <h3 className="layout-footer-title">감귤마켓</h3>
              <p className="layout-footer-text">
                안전하고 편리한 중고 거래 플랫폼
              </p>
            </div>
            <div>
              <h4 className="layout-footer-heading">링크</h4>
              <ul className="layout-footer-links">
                <li><a href="/" className="layout-footer-link">홈</a></li>
                <li><a href="/articles/new" className="layout-footer-link">글쓰기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="layout-footer-heading">고객 지원</h4>
              <ul className="layout-footer-links">
                <li><a href="#" className="layout-footer-link">자주 묻는 질문</a></li>
                <li><a href="#" className="layout-footer-link">이용약관</a></li>
                <li><a href="#" className="layout-footer-link">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div className="layout-footer-bottom">
            <p className="layout-footer-copyright">
              © {new Date().getFullYear()} 감귤마켓. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 