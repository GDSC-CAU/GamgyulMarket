const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger 정의
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '중고 거래 웹 서비스 API',
      version: '1.0.0',
      description: '중고 거래 웹 서비스를 위한 RESTful API',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API 서버',
      },
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            article_id: {
              type: 'integer',
              description: '게시물 ID',
            },
            title: {
              type: 'string',
              description: '게시물 제목',
            },
            content: {
              type: 'string',
              description: '게시물 내용',
            },
            price: {
              type: 'integer',
              description: '가격',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: '생성 시간',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: '이미지 URL 배열',
            },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            comment_id: {
              type: 'integer',
              description: '댓글 ID',
            },
            content: {
              type: 'string',
              description: '댓글 내용',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: '생성 시간',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: '에러 메시지',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // 라우트 파일 경로
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
}; 