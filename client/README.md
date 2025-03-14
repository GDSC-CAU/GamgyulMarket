# 중고 거래 웹 서비스 클라이언트

React, TypeScript, Tailwind CSS를 사용하여 구현한 중고 거래 웹 서비스 클라이언트입니다. 이 프로젝트는 게시물 작성, 조회, 수정, 삭제 및 댓글 기능을 제공합니다.

## 기술 스택

- **프론트엔드**: React, TypeScript, Tailwind CSS
- **상태 관리**: React Hooks
- **라우팅**: React Router
- **HTTP 클라이언트**: Axios
- **빌드 도구**: Vite

## 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- npm (v6 이상)
- 서버 API가 실행 중이어야 합니다 (기본 URL: http://localhost:3000)

### 설치 방법

1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

### 개발 모드로 실행

```bash
npm run dev
```

개발 서버는 기본적으로 http://localhost:5173 에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 주요 기능

### 1. 게시물 관리
- 게시물 목록 조회 (페이지네이션 지원)
- 게시물 상세 조회
- 게시물 작성 (이미지 업로드 지원)
- 게시물 수정
- 게시물 삭제

### 2. 댓글 관리
- 댓글 작성
- 댓글 수정
- 댓글 삭제

### 3. 인증
- 비밀번호 기반 인증 (게시물 및 댓글 수정/삭제 시 필요)

## 프로젝트 구조

```
src/
├── api/          # API 호출 관련 코드
├── components/   # 재사용 가능한 컴포넌트
├── pages/        # 페이지 컴포넌트
├── types/        # TypeScript 타입 정의
├── utils/        # 유틸리티 함수
├── App.tsx       # 메인 앱 컴포넌트
└── main.tsx      # 앱 진입점
```

## 사용된 라이브러리

- **react-router-dom**: 클라이언트 사이드 라우팅
- **axios**: API 요청 처리
- **@heroicons/react**: UI 아이콘
