<h1 align="center">포트폴리오 클라이언트 (Portfolio Client)</h1>

<p align="center">
  개인 포트폴리오 웹사이트의 프론트엔드 애플리케이션입니다.<br/>
  <b>React</b>와 <b>TypeScript</b> 기반으로 개발되었으며,<br/>
  반응형 디자인, 다국어 지원, 프로젝트 데이터 시각화를 포함합니다.
</p>

---

## 📘 프로젝트 개요

이 웹 애플리케이션은 웹 개발자 Naeun Lee의
프로젝트 경험과 기술 스택을 직관적으로 보여주는 것을 목표로 합니다.  
백엔드 서버(`portfolio-server`)와 통신하여 프로젝트 데이터를 실시간으로 불러옵니다.

> ⚙️ 서버 레포지토리: [nu-ean/portfolio-server](https://github.com/nu-ean/portfolio-server)

---

## ✨ 주요 기능

- **프로젝트 페이지**
  - 프로젝트 리스트 및 상세 정보 조회
  - 이미지 슬라이더 및 모달 뷰어
- **About 페이지**
  - 자기소개 및 기술 스택 시각화
- **Contact 페이지**
  - 이메일 전송 또는 소셜 링크 연결
- **테마 전환**
  - 라이트 / 다크 모드 지원
- **반응형 UI**
  - 데스크톱 / 태블릿 / 모바일 환경 대응

---

## 🧱 디렉토리 구조

```
src/
├── api/            # 서버 API 통신 모듈
├── assets/         # 정적 리소스 (이미지, 아이콘 등)
├── components/     # 공용 UI 컴포넌트
├── hooks/          # 커스텀 훅
├── i18n/           # 다국어(i18n) 설정 파일
├── layouts/        # 공통 레이아웃 컴포넌트
├── pages/          # 라우팅되는 주요 페이지 컴포넌트
├── router/         # 라우터 설정 (React Router)
├── store/          # Redux 상태 관리 관련 코드
├── styles/         # 전역 및 테마 스타일 정의
├── types/          # 전역 타입 정의
├── util/           # 공용 유틸리티 함수
└── main.tsx        # 애플리케이션 진입점
```

---

## 🛠 사용 기술

| 분야            | 기술 스택                    |
| --------------- | ---------------------------- |
| **언어**        | TypeScript                   |
| **프레임워크**  | React (Vite 기반 빌드)       |
| **상태 관리**   | Redux                        |
| **데이터 요청** | TanStack Query (React Query) |
| **스타일링**    | CSS Modules, Framer Motion   |

---

## 🧩 주요 특징

- **모듈화된 UI 컴포넌트 구조**
- **TypeScript 기반의 정적 타입 안정성**
- **반응형 디자인 및 접근성 고려**
- **SEO 대응을 위한 메타 태그 구성**
- **다크모드 토글 구현**

---

## 🧭 디자인 및 애니메이션

- Framer Motion을 활용한 자연스러운 페이지 전환 및 요소 등장 효과

---

## 📄 License

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

---

<p align="center">
  <sub>© 2025 Naeun Lee. Built with 💙 using React & TypeScript.</sub>
</p>
