import { useTranslation } from "react-i18next";

import styles from "./Common.module.css";
import { type ProjectCategory } from "../../types/Project";

export default function Category({ category }: { category: ProjectCategory }) {
  const { t } = useTranslation();

  const bgColor = category === "WORK" ? "#ff9100c7" : "#0091ffc7";

  return (
    <span className={styles.category} style={{ backgroundColor: bgColor }}>
      {t(`element.category.${category}`)}
    </span>
  );
}
