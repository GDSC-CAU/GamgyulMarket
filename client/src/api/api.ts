import axios from 'axios';
import { 
  Article, 
  ArticleListResponse, 
  CreateArticleRequest, 
  UpdateArticleRequest,
  CreateCommentRequest,
  UpdateCommentRequest
} from '../types';

const API_BASE_URL = 'http://localhost:3000/api/v1';
const SERVER_BASE_URL = 'http://localhost:3000';

// Helper function to convert relative image paths to absolute URLs
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If the path already starts with http, it's already an absolute URL
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, prepend the server base URL
  return `${SERVER_BASE_URL}${imagePath}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Articles API
export const getArticles = async (page = 1, size = 20): Promise<ArticleListResponse> => {
  const response = await api.get(`/articles?page=${page}&size=${size}`);
  return response.data;
};

export const getArticleById = async (articleId: number): Promise<Article> => {
  const response = await api.get(`/articles/${articleId}`);
  return response.data;
};

export const createArticle = async (articleData: CreateArticleRequest): Promise<{ article_id: number }> => {
  const formData = new FormData();
  formData.append('title', articleData.title);
  formData.append('content', articleData.content);
  formData.append('price', articleData.price.toString());
  formData.append('password', articleData.password);
  
  if (articleData.images) {
    articleData.images.forEach(image => {
      formData.append('images', image);
    });
  }
  
  const response = await axios.post(`${API_BASE_URL}/articles`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const updateArticle = async (articleId: number, articleData: UpdateArticleRequest): Promise<void> => {
  const formData = new FormData();
  formData.append('password', articleData.password);
  
  if (articleData.title) formData.append('title', articleData.title);
  if (articleData.content) formData.append('content', articleData.content);
  if (articleData.price) formData.append('price', articleData.price.toString());
  
  if (articleData.images) {
    articleData.images.forEach(image => {
      formData.append('images', image);
    });
  }
  
  await axios.put(`${API_BASE_URL}/articles/${articleId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteArticle = async (articleId: number, password: string): Promise<void> => {
  await api.delete(`/articles/${articleId}`, {
    data: { password }
  });
};

// Comments API
export const createComment = async (articleId: number, commentData: CreateCommentRequest): Promise<{ comment_id: number }> => {
  const response = await api.post(`/articles/${articleId}/comments`, commentData);
  return response.data;
};

export const updateComment = async (articleId: number, commentId: number, commentData: UpdateCommentRequest): Promise<void> => {
  await api.put(`/articles/${articleId}/comments/${commentId}`, commentData);
};

export const deleteComment = async (articleId: number, commentId: number, password: string): Promise<void> => {
  await api.delete(`/articles/${articleId}/comments/${commentId}`, {
    data: { password }
  });
}; 