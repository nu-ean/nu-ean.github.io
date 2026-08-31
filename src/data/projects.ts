import { type Project } from "../types/Project";

export const projects: Project[] = [
  {
    index: 1,
    id: "36776047-721e-4be4-8fc8-36ed5a5289e5",
    title: "웹 기반 생산·재고 관리 시스템",
    category: "WORK",
    startDate: "2022-05-01",
    endDate: "2022-10-31",
    techTags: [
      "Spring Boot",
      "JSP",
      "MySQL",
      "MyBatis",
      "Tomcat",
      "jQuery",
      "HTML",
      "CSS",
    ],
    summary:
      "기존 **Java Swing 기반의 데스크톱 생산•재고 관리 프로그램을 웹 환경으로 마이그레이션**한 프로젝트입니다. 제품 및 반제품의 입•출고 기록을 통해 재고를 실시간으로 조회할 수 있으며, 제품•직원 등 기초 데이터를 사전에 등록하고 매입·매출·생산 내역 입력 시 관련 재고가 자동으로 반영되도록 구현했습니다.",
    description:
      "MES의 일부 기능(공정별 생산 이력 관리)과 ERP의 재고·매입·매출 관리 기능을 통합하여 운영 효율성과 데이터 일관성을 향상시킨 것이 특징이며, 클라이언트 업체별 요구사항에 따라 기능을 커스터마이징하여, 각 현장의 운영 방식에 맞춘 맞춤형 솔루션을 제공했습니다.\n\n## 역할\n\n* **프로젝트 전체 아키텍처 설계 및 개발**\n    * 제품, 반제품, 직원, 거래처 등 주요 엔터티 모델링 및 데이터베이스 설계\n* **백엔드 개발**\n    * Spring Boot 기반 RESTful API 개발\n    * 매입·매출·생산·입출고 로직 구현 및 재고 실시간 반영 처리\n    * MyBatis 기반 쿼리 매퍼를 구현하고, 트랜잭션 처리를 통해 재고 입출고 시 데이터 일관성 확보\n* **프론트엔드 개발**\n    * JSP 및 jQuery 기반 UI 구현\n    * 반응형 레이아웃 적용 및 공통 모듈(헤더, 네비게이션, 팝업) 구성\n* **고객 맞춤형 커스터마이징**\n    * 클라이언트별 요구사항 분석 후 기능 확장 (예: 업체별 맞춤 생산 보고서 출력)\n    * 현장 운영 프로세스에 맞춘 설정 기능 추가 및 유지보수",
  },
  {
    index: 2,
    id: "5ec87c65-6f0d-4b69-b814-8b35fcdc0cd8",
    title: "도서 대여 관리 시스템",
    category: "WORK",
    startDate: "2024-08-01",
    endDate: "2024-12-31",
    techTags: [
      "Spring Boot",
      "React",
      "Docker Compose",
      "MySQL",
      "JWT",
      "Material UI",
    ],
    summary:
      "학교 내 설치된 **도서 대여·반납 키오스크와 연동되는 웹 기반 관리 시스템**입니다. 키오스크에서 발생하는 대여·반납 요청을 처리하는 API 서버와 관리용 웹 페이지를 개발했습니다. 데스크톱 애플리케이션과 연동하여 대여·반납 로직 및 데이터 저장 기능을 구현하고, 웹 관리자 페이지에서는 계정, 도서, 공지사항, 대여 이력 관리를 지원합니다. 또한 JWT 기반 인증을 적용해 역할별 접근 제어와 세션 만료 처리를 구현했습니다.",
    description:
      "## 역할\n\n- **서버 및 데이터베이스 구성**\n    - MySQL 스키마 설계 (계정, 도서, 대여이력, 공지사항 등)\n    - Docker Compose 기반 **백엔드·프론트엔드·DB 통합 실행 환경** 구축\n    - Linux 서버 환경에서 Spring Boot JAR 및 React build 배포\n\n- **백엔드 개발**\n    - Spring Boot 기반 REST API 설계 및 구현\n    - JWT 인증 및 토큰 만료 처리 로직 구현\n    - MyBatis를 활용한 CRUD 및 동적 검색 쿼리 작성\n    - 트랜잭션 처리로 대여·반납 시 재고 정합성 유지\n\n- **프론트엔드 개발**\n    - React 기반 **관리자용 웹 UI** 구현 (도서, 계정, 공지사항 관리 기능)\n    - Material UI DataGrid를 활용한 목록·검색·필터링 화면 개발\n    - Snackbar, Dialog 등 공통 컴포넌트 모듈화\n    - Axios 인터셉터를 이용한 인증 헤더 자동 처리 및 세션 만료 대응\n    - i18next를 이용한 다국어 메시지 관리\n\n",
  },
  {
    index: 3,
    id: "7551b116-701e-43be-a2b5-1c4a87cb1e59",
    title: "개인 포트폴리오 사이트",
    category: "PERSONAL",
    startDate: "2025-07-01",
    endDate: "2025-11-14",
    techTags: [
      "React",
      "NestJS",
      "TypeScript",
      "Redux",
      "TanStack Query",
      "TypeORM",
      "AWS EC2",
      "AWS S3",
      "Nginx",
      "GitHub Actions",
    ],
    summary:
      "개발자로서의 역량을 종합적으로 보여주기 위해 제작한 개인 포트폴리오 웹사이트입니다. **React와 NestJS 기반의 풀스택 구조**로 설계부터 구현, 배포까지 전 과정을 직접 수행하였습니다. UI는 반응형 레이아웃 중심으로 설계하여 다양한 환경에서 일관된 사용자 경험을 유지할 수 있도록 했으며, 테마 전환과 애니메이션 효과를 통해 시각적 완성도를 높이기 위해 노력했습니다.",
    description:
      "### 주요 특징\n\n- **인프라 / DevOps**\n    - **AWS 인프라 구축 :** EC2에 서버를 호스팅하고 S3를 정적 파일 및 이미지 저장소로 활용했으며, Nginx를 이용해 리버스 프록시와 정적 리소스 서빙 환경을 구성했습니다.\n    - **CI/CD 자동화 :** GitHub Actions를 활용해 빌드 및 배포 자동화를 구현했습니다.\n\n- **백엔드**\n    - **프로젝트 데이터 관리 API :** NestJS와 TypeORM을 사용하여 프로젝트 등록, 수정, 삭제, 조회 기능을 구현했습니다.\n    - **유효성 검증 및 DTO 설계 :** class-validator, class-transformer를 활용해 DTO 기반 데이터 검증 로직을 구축했습니다.\n    - **이미지 업로드 및 파일 관리 :** 멀티파트 요청 처리 및 AWS S3 연동을 통해 프로젝트 이미지 업로드와 관리 기능을 구현했습니다.\n    - **API 구조 및 응답 포맷 통일화 :** 공통 ResponseDTO 구조를 적용하여 클라이언트와의 일관된 데이터 통신을 유지했습니다.\n\n- **프론트엔드**\n    - **프로젝트 리스트 및 상세 보기 :** 프로젝트별 개요, 기술 스택, 문제 해결 과정을 카드 형태로 표시하고, 상세 페이지에서는 마크다운 기반 본문 렌더링을 구현했습니다.\n    - **반응형 UI 설계 :** 다양한 해상도에서도 동일한 사용자 경험을 제공하기 위해 CSS Modules와 미디어 쿼리를 활용한 반응형 레이아웃을 구현했습니다.\n    - **테마 전환 (다크·라이트 모드)** : CSS 변수를 이용해 전역 색상 테마를 관리하고, 사용자가 즉시 테마를 전환할 수 있도록 구성했습니다.\n    - **애니메이션 및 인터랙션 효과 :** Framer Motion을 활용해 카드 전환, 페이드인, 스크롤 애니메이션 등 자연스러운 인터랙션을 구현했습니다.\n    - **비동기 데이터 요청 및 캐싱 :** TanStack Query를 사용해 API 요청, 캐싱, 로딩 상태, 에러 핸들링을 효율적으로 관리했습니다.\n",
    image1:
      "projects/7551b116-701e-43be-a2b5-1c4a87cb1e59/images/slot-1-1762851882851.png",
    image2:
      "projects/7551b116-701e-43be-a2b5-1c4a87cb1e59/images/slot-2-1762851908708.png",
    image3:
      "projects/7551b116-701e-43be-a2b5-1c4a87cb1e59/images/slot-3-1762852084163.png",
    image4:
      "projects/7551b116-701e-43be-a2b5-1c4a87cb1e59/images/slot-4-1762852087776.png",
  },
  {
    index: 4,
    id: "9bca0139-6732-404c-b8c1-dea3cbefbd64",
    title: "테이블•모바일 주문 서비스",
    category: "WORK",
    startDate: "2023-03-01",
    endDate: "2024-12-31",
    techTags: ["React", "JavaScript", "Nginx", "HTML", "CSS"],
    summary:
      "키오스크·POS 시스템과 연동되는 **테이블 및 모바일 주문 기능을 신규로 개발**한 프로젝트입니다. 매장 내 고객이 태블릿 PC(테이블 주문) 또는 QR 코드(모바일 주문)를 통해 직접 메뉴를 선택하고 주문할 수 있으며, 주문 내역은 기존 POS 시스템과 실시간으로 연동되어 매출 관리 및 주문 상태 처리가 자동으로 이루어집니다.",
    description:
      "웹 기반 하이브리드 구조(안드로이드 앱 + 웹 뷰)로 설계되었으며, 프론트엔드는 React 기반으로 개발하여 태블릿과 모바일 환경 모두에 대응하는 반응형 UI를 구현했습니다.\n\n## 역할\n\n- **프론트엔드 개발**\n    - React 기반 주문 화면 및 메뉴 리스트 UI 구현\n    - 태블릿 환경에 최적화된 레이아웃 및 터치 인터랙션 개발\n- **협업 및 유지보수**\n    - 백엔드·POS 팀과의 API 명세 협의 및 UI 연동 테스트 수행\n    - 릴리즈 이후 클라이언트 피드백 반영 및 UI 개선 작업 수행",
  },
  {
    index: 5,
    id: "b6622c18-c731-4572-b4e4-e0aa67f37caf",
    title: "마약류 재고 관리 시스템",
    category: "WORK",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    techTags: [
      "Spring Boot",
      "React",
      "Linux",
      "Nginx",
      "MySQL",
      "Apache POI",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    summary:
      "마약류 관리법 강화에 따라 의무화된 **약품 보관함 2중 잠금장치 도입 및 입·출고 이력 전산화** 요구사항을 충족하기 위해 개발된 시스템입니다. 화면 일체형 PC(Windows)와 서버 PC(Linux)가 함께 내장된 마약류 보관함 내부에서 동작하며, 지문 인증과 입·출고 기록 관리를 통해 약품 재고를 실시간으로 관리합니다.",
    description:
      "또한 외부 인터넷이 차단된 **폐쇄망 환경에서도 독립적으로 운영**될 수 있도록, 서버 내부에 MySQL, Spring Boot, React, Nginx 환경을 직접 구축하였으며, 의료진이 금고를 개폐할 때마다 발생하는 모든 입·출고 데이터를 안전하고 안정적으로 저장·조회할 수 있도록 설계했습니다.\n\n\n## **역할**\n\n- **서버 환경 구축**\n    - Linux 기반 서버 PC에 MySQL, Nginx 환경 구성\n    - React 정적 빌드 및 Spring Boot API 서버 배포\n    - 폐쇄망에서 동작하도록 로컬 DNS 구성\n- **데이터베이스 설계**\n    - MySQL 스키마 설계 (약품, 사용자, 입·출고 로그, 폐기 내역 등)\n    - 트랜잭션 처리로 데이터 정합성 확보 및 로그 자동 기록\n- **백엔드 개발**\n    - Spring Boot 기반 REST API 설계\n    - 마약류 입·출고, 폐기, 재고 현황 데이터 관리\n    - 사용자(의료진) 및 관리자 권한 분리 및 인증 로직 설계\n    - Apache POI 라이브러리를 이용한 데이터 엑셀 출력 구현\n- **프론트엔드 개발**\n    - React 기반 UI 구현 (입·출고 내역 조회)",
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
