const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const commentController = require('../controllers/comment.controller');
const { authenticateArticle, authenticateComment } = require('../middlewares/auth.middleware');
const upload = require('../utils/upload');

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: 게시물 작성
 *     tags: [Articles]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시물 제목
 *               content:
 *                 type: string
 *                 description: 게시물 내용
 *               price:
 *                 type: integer
 *                 description: 가격
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 이미지 파일 (최대 5개)
 *     responses:
 *       201:
 *         description: 게시물 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article_id:
 *                   type: integer
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/articles', upload.array('images', 5), (req, res, next) => {
  // Process uploaded files
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map(file => `/uploads/images/${file.filename}`);
  }
  next();
}, articleController.createArticle);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 게시물 목록 조회
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 페이지당 게시물 수
 *     responses:
 *       200:
 *         description: 게시물 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       article_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       price:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       thumbnail_url:
 *                         type: string
 *                         nullable: true
 *                 total_count:
 *                   type: integer
 *                 total_pages:
 *                   type: integer
 */
router.get('/articles', articleController.getArticles);

/**
 * @swagger
 * /articles/{article_id}:
 *   get:
 *     summary: 게시물 상세 조회
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시물 ID
 *     responses:
 *       200:
 *         description: 게시물 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 price:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 게시물을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/articles/:article_id', articleController.getArticleById);

/**
 * @swagger
 * /articles/{article_id}:
 *   put:
 *     summary: 게시물 수정
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시물 ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *                 description: 비밀번호
 *               title:
 *                 type: string
 *                 description: 게시물 제목
 *               content:
 *                 type: string
 *                 description: 게시물 내용
 *               price:
 *                 type: integer
 *                 description: 가격
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 이미지 파일 (최대 5개)
 *     responses:
 *       204:
 *         description: 게시물 수정 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 게시물을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/articles/:article_id', upload.array('images', 5), (req, res, next) => {
  // Process uploaded files
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map(file => `/uploads/images/${file.filename}`);
  }
  next();
}, authenticateArticle, articleController.updateArticle);

/**
 * @swagger
 * /articles/{article_id}:
 *   delete:
 *     summary: 게시물 삭제
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시물 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *                 description: 비밀번호
 *     responses:
 *       204:
 *         description: 게시물 삭제 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 게시물을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/articles/:article_id', authenticateArticle, articleController.deleteArticle);

/**
 * @swagger
 * /articles/{article_id}/comments:
 *   post:
 *     summary: 댓글 작성
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시물 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 required: true
 *                 description: 댓글 내용
 *               password:
 *                 type: string
 *                 required: true
 *                 description: 비밀번호
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment_id:
 *                   type: integer
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 게시물을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/articles/:article_id/comments', commentController.createComment);

/**
 * @swagger
 * /articles/{article_id}/comments/{comment_id}:
 *   put:
 *     summary: 댓글 수정
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시물 ID
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 required: true
 *                 description: 댓글 내용
 *               password:
 *                 type: string
 *                 required: true
 *                 description: 비밀번호
 *     responses:
 *       204:
 *         description: 댓글 수정 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/articles/:article_id/comments/:comment_id', authenticateComment, commentController.updateComment);

/**
 * @swagger
 * /articles/{article_id}/comments/{comment_id}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시물 ID
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *                 description: 비밀번호
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/articles/:article_id/comments/:comment_id', authenticateComment, commentController.deleteComment);

module.exports = router; 