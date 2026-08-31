import styles from "./AboutContent.module.css";

export default function Journey() {
  return (
    <div className={styles.journey}>
      <h3>💼 Work Experience</h3>
      <div className={styles.grayBox}>
        <div className={styles.listTitle}>
          <span>(주)레이월드</span>
          <span>| 2021.12 ~ 2024.12 (3년)</span>
        </div>
        <p>
          다양한 도메인의 웹 시스템을 설계·구현하며 기획부터 운영까지의 전
          과정을 경험했습니다. Spring Boot, React, MySQL 기반으로 백엔드부터
          프론트엔드까지 직접 구축하였으며, GitLab과 Bitbucket을 통한 협업,
          리눅스 서버 환경에서의 웹 서비스 배포·운영 업무를 수행했습니다.
        </p>
      </div>
      <h3>🎓 Education & Learning</h3>
      <div className={styles.grayBox}>
        <div className={styles.listTitle}>
          <span>국비지원 Python & Java 웹 개발자 양성과정</span>
          <span>| 2021.05 ~ 2021.12 (6개월)</span>
        </div>
        <ul>
          <li>Java, Spring, MyBatis를 이용한 백엔드 개발</li>
          <li>HTML, CSS, JavaScript를 이용한 프론트엔드 개발</li>
          <li>Oracle 기반 데이터베이스 설계 및 REST API 통신 실습</li>
        </ul>
        <div className={styles.listTitle}>
          <span>Udemy & Online Learning</span>
          <span>| 꾸준히 학습중</span>
        </div>
        <ul>
          <li>React & TypeScript 심화, 상태 관리 및 리팩토링</li>
          <li>NestJS + TypeORM 기반 백엔드 구조 설계</li>
        </ul>
      </div>
    </div>
  );
}
