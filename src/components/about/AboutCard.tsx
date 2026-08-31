import { type ReactNode } from "react";
import styles from "./About.module.css";
import { resolveImage } from "../../util/functions";

export type AboutItem = {
  id: string;
  sectionLabel: string;
  headline?: string;
  tagline?: string;
  content: ReactNode;
  image?: string;
};

export default function AboutCard({ item }: { item: AboutItem }) {
  return (
    <div data-stack-card className={styles.card}>
      <div className={styles.cardHeader}>
        <span style={{ color: "#ff5f57" }}>●</span>
        <span style={{ color: "#febc2e" }}>●</span>
        <span style={{ color: "#27c840" }}>●</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.title}>
          <span className={styles.sectionLabel}>
            {item.sectionLabel.toUpperCase()}
          </span>
          <h2 className={styles.headline}>{item.headline}</h2>
          <p className={styles.tagline}>{item.tagline}</p>
        </div>
        <div className={styles.content}>{item.content}</div>
        <div className={styles.image}>
          {item.image && (
            <img src={resolveImage(item.image)} alt={item.sectionLabel} />
          )}
        </div>
      </div>
    </div>
  );
}
