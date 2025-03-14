export interface Article {
  article_id: number;
  title: string;
  content: string;
  price: number;
  created_at: string;
  images: string[];
  comments?: Comment[];
  thumbnail_url?: string;
  status?: 'active' | 'sold' | 'reserved';
  location?: string;
}

export interface Comment {
  comment_id: number;
  article_id: number;
  content: string;
  created_at: string;
}

export interface ArticleListResponse {
  articles: Article[];
  total_count: number;
  total_pages: number;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  price: number;
  password: string;
  images?: File[];
}

export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  price?: number;
  password: string;
  images?: File[];
}

export interface CreateCommentRequest {
  content: string;
  password: string;
}

export interface UpdateCommentRequest {
  content: string;
  password: string;
}

export interface ApiError {
  error: string;
} 