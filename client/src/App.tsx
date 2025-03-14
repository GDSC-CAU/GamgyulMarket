import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ArticleFormPage from './pages/ArticleFormPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/new" element={<ArticleFormPage />} />
        <Route path="/articles/:articleId" element={<ArticleDetailPage />} />
        <Route path="/articles/:articleId/edit" element={<ArticleFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
