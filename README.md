# 감귤마켓 중고거래 서비스

## 프로젝트 소개
이 프로젝트는 사용자들이 중고 물품을 등록하고 거래할 수 있는 온라인 마켓 플랫폼입니다. 사용자 친화적인 인터페이스와 직관적인 디자인으로 누구나 쉽게 물품을 등록하고 검색할 수 있습니다.

## 주요 기능
- **물품 등록**: 사용자는 판매하고자 하는 물품의 제목, 내용, 가격을 입력하고 이미지를 첨부하여 등록할 수 있습니다.
- **물품 조회**: 등록된 모든 물품을 홈페이지에서 확인할 수 있으며, 페이지네이션을 통해 여러 페이지를 탐색할 수 있습니다.
- **물품 상세 정보**: 각 물품의 상세 정보를 확인할 수 있으며, 댓글을 통해 판매자와 소통할 수 있습니다.
- **물품 수정/삭제**: 등록한 물품의 정보를 수정하거나 삭제할 수 있습니다. 비밀번호를 통해 작성자 인증이 이루어집니다.
- **이미지 업로드**: 물품 등록 시 여러 장의 이미지를 첨부할 수 있습니다.

## 기술 스택

### 프론트엔드
- **React**: 사용자 인터페이스 구축
- **TypeScript**: 타입 안정성 확보
- **React Router**: 클라이언트 사이드 라우팅
- **Tailwind CSS**: 스타일링
- **Axios**: API 통신

### 백엔드
- **Node.js**: 서버 환경
- **Express**: 웹 프레임워크
- **Sequelize**: ORM(Object-Relational Mapping)
- **SQLite**: 데이터베이스
- **Multer**: 파일 업로드 처리
- **Swagger**: API 문서화

## 프로젝트 구조

```
market/
├── client/                # 프론트엔드
│   ├── src/
│   │   ├── api/           # API 호출 함수
│   │   ├── assets/        # 정적 자산 (이미지, 폰트 등)
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   ├── context/       # React Context
│   │   ├── hooks/         # 커스텀 훅
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── types/         # TypeScript 타입 정의
│   │   ├── utils/         # 유틸리티 함수
│   │   ├── App.tsx        # 메인 앱 컴포넌트
│   │   └── main.tsx       # 앱 진입점
│   └── package.json       # 프론트엔드 의존성
│
├── server/                # 백엔드
│   ├── src/
│   │   ├── controllers/   # 컨트롤러
│   │   ├── middlewares/   # 미들웨어
│   │   ├── models/        # 데이터 모델
│   │   ├── routes/        # API 라우트
│   │   ├── utils/         # 유틸리티 함수
│   │   └── app.js         # 서버 진입점
│   ├── uploads/           # 업로드된 파일 저장소
│   └── package.json       # 백엔드 의존성
```

## 시작하기

### 프론트엔드 실행
```bash
cd client
npm install
npm run dev
```

### 백엔드 실행
```bash
cd server
npm install
npm run dev
```

## API 문서
서버 실행 후 다음 URL에서 Swagger API 문서를 확인할 수 있습니다:
```
http://localhost:3000/api-docs
```

## 개발 환경 설정
- Node.js 18.x 이상
- npm 9.x 이상

## 라이센스
이 프로젝트는 MIT 라이센스 하에 배포됩니다. 