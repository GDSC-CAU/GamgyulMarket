import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage; 