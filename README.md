# 중고 거래 웹 서비스 API

Node.js와 Express.js를 사용하여 구현한 중고 거래 웹 서비스 RESTful API입니다. 이 프로젝트는 게시물 작성, 조회, 수정, 삭제 및 댓글 기능을 제공합니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
  - [사전 요구사항](#사전-요구사항)
  - [설치 방법](#설치-방법)
  - [실행 방법](#실행-방법)
- [API 문서 및 테스트](#api-문서-및-테스트)
- [API 엔드포인트](#api-엔드포인트)
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [개발 가이드](#개발-가이드)
- [문제 해결](#문제-해결)

## 🛠 기술 스택

- **백엔드**: Node.js, Express.js
- **데이터베이스**: SQLite (Sequelize ORM)
- **파일 업로드**: Multer
- **API 문서화**: Swagger UI
- **개발 도구**: Nodemon (개발 모드 자동 재시작)

## 🚀 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- npm (v6 이상)

### 설치 방법

1. 저장소를 클론합니다:
   ```bash
   git clone <저장소 URL>
   cd node-js-basic
   ```

2. 의존성을 설치합니다:
   ```bash
   npm install
   ```

### 실행 방법

#### 개발 모드로 실행 (권장)

개발 모드에서는 코드 변경 시 서버가 자동으로 재시작됩니다:

```bash
npm run dev
```

#### 프로덕션 모드로 실행

```bash
npm start
```

서버는 기본적으로 3000 포트에서 실행됩니다. 브라우저에서 `http://localhost:3000`으로 접속할 수 있습니다.

## 📚 API 문서 및 테스트

Swagger UI를 통해 API 문서를 확인하고 테스트할 수 있습니다:

- URL: `http://localhost:3000/api-docs`

Swagger UI에서는 다음과 같은 기능을 제공합니다:
- 모든 API 엔드포인트의 문서화된 목록 확인
- 각 엔드포인트의 요청 및 응답 형식 확인
- 실제 API 호출 테스트 ("Try it out" 버튼 사용)
- 파일 업로드를 포함한 모든 기능 테스트

## 🔌 API 엔드포인트

### 기본 URL: `/api/v1`

### 1. 게시물 (Articles)

| Method | URL | 설명 |
| --- | --- | --- |
| `POST` | `/articles` | 게시물 작성 |
| `GET` | `/articles` | 게시물 목록 조회 (페이지네이션 지원) |
| `GET` | `/articles/{article_id}` | 게시물 상세 조회 (댓글 포함) |
| `PUT` | `/articles/{article_id}` | 게시물 수정 |
| `DELETE` | `/articles/{article_id}` | 게시물 삭제 |

### 2. 댓글 (Comments)

| Method | URL | 설명 |
| --- | --- | --- |
| `POST` | `/articles/{article_id}/comments` | 댓글 작성 |
| `PUT` | `/articles/{article_id}/comments/{comment_id}` | 댓글 수정 |
| `DELETE` | `/articles/{article_id}/comments/{comment_id}` | 댓글 삭제 |

## ✨ 주요 기능

### 1. 게시물 관리
- 게시물 작성, 조회, 수정, 삭제 기능
- 이미지 업로드 지원 (최대 5개, 각 5MB 제한)
- 페이지네이션을 통한 게시물 목록 조회

### 2. 댓글 관리
- 게시물에 댓글 작성, 수정, 삭제 기능

### 3. 인증
- 비밀번호 기반 인증 (게시물 및 댓글 수정/삭제 시 필요)
- 비밀번호는 게시물 또는 댓글 생성 시 설정

### 4. 파일 업로드
- 이미지 파일 업로드 지원 (JPEG, JPG, PNG, GIF 형식)
- 업로드된 이미지는 `/uploads/images` 디렉토리에 저장

## 📁 프로젝트 구조

```
.
├── src/
│   ├── controllers/       # 컨트롤러 (비즈니스 로직)
│   │   ├── article.controller.js
│   │   └── comment.controller.js
│   ├── middlewares/       # 미들웨어
│   │   └── auth.middleware.js
│   ├── models/            # 데이터베이스 모델
│   │   ├── article.model.js
│   │   ├── comment.model.js
│   │   └── index.js
│   ├── routes/            # 라우트 정의
│   │   └── article.routes.js
│   ├── utils/             # 유틸리티 함수
│   │   ├── password.js
│   │   ├── swagger.js
│   │   └── upload.js
│   └── app.js             # 애플리케이션 진입점
├── uploads/               # 업로드된 파일 저장 디렉토리
│   └── images/
├── database.sqlite        # SQLite 데이터베이스 파일
├── package.json           # 프로젝트 메타데이터 및 의존성
└── README.md              # 프로젝트 문서
```
