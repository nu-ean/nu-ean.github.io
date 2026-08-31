import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./AboutContent.module.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className={styles.about}>
      <p>
        안녕하세요, <b>웹 풀스택 개발자 이나은</b>입니다.
      </p>
      <p>
        웹 애플리케이션의{" "}
        <b>
          프론트엔드 개발을 중심으로, 필요에 따라 서버와 데이터베이스
          설계·운영까지{" "}
        </b>
        직접 다뤄왔습니다.
      </p>
      <p>
        프로젝트를 진행할 때는 항상 ‘사용자가 이해하기 쉬운 구조’를 가장 먼저
        고민합니다. 생산 관리, 주문 서비스, 재고 관리 등 여러 도메인의 웹
        시스템을 구축하며 단순한 기능 구현을 넘어, 서비스가 실제로 ‘사용되는
        순간’을 그리며 개발해왔습니다.
      </p>
      <p>
        새로운 기술을 배우고 적용하는 일을 좋아하지만, 무엇보다도{" "}
        <b>지속적으로 관리할 수 있는 코드</b>를 작성하는 데 가치를 두고
        있습니다. 문제를 마주할 때마다 배움을 얻고, 작은 개선을 통해 더 나은
        경험을 만들어가는 과정이 즐겁습니다.
      </p>
      <p>
        앞으로도 변화하는 기술 환경 속에서 <b>사용자 중심의 서비스</b>를
        안정적으로 제공할 수 있는 개발자로 성장해가고자 합니다.
      </p>
      <div className={styles.linkButtons}>
        <Link to="/projects" className={styles.ctaButton}>
          {t("title.view-projects")} ↗
        </Link>
        <Link to="/contact" className={styles.ctaButtonAlt}>
          {t("title.get-in-touch")} ↗
        </Link>
      </div>
    </div>
  );
}
