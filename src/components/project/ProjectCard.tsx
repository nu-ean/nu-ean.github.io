import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { type Project } from "../../types/Project";
import Category from "../common/Category";
import TechTagList from "./TechTagList";
import { formatPeriod } from "../../util/functions";
import styles from "./Project.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  function renderSummary(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  }

  return (
    <motion.div
      className={`${styles.card} glass-card`}
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: project.index * 0.08,
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderTop}>
          <div className={styles.cardTitle}>{project.title}</div>
          <Category category={project.category} />
        </div>
        <div className={styles.period}>
          {formatPeriod(project.startDate, project.endDate)}
        </div>
      </div>

      <div className={styles.summary}>
        {renderSummary(project.summary ?? "")}
      </div>
      <TechTagList tags={project.techTags ?? []} variant="mono" />
      <Link
        className={`underline-link ${styles.moreLink}`}
        to={`/projects/${project.id}`}
      >
        {t("button.view-details")} →
      </Link>
    </motion.div>
  );
}
