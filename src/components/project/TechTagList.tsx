import { useEffect, useRef, useState } from "react";
import TechTag from "../common/TechTag";
import styles from "./Project.module.css";

type TechTagsProps = {
  tags: string[];
  variant?: "color" | "mono";
};

export default function TechTagList({
  tags,
  variant = "color",
}: TechTagsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxVisibleTags, setMaxVisibleTags] = useState(10);

  useEffect(() => {
    const cardEl = containerRef.current?.parentElement;

    if (!cardEl) return;

    const updateMaxVisibleTags = () => {
      const width = cardEl.offsetWidth;

      if (width < 270) {
        setMaxVisibleTags(5);
      } else if (width < 320) {
        setMaxVisibleTags(6);
      } else if (width < 410) {
        setMaxVisibleTags(7);
      } else if (width < 470) {
        setMaxVisibleTags(8);
      } else {
        setMaxVisibleTags(10);
      }
    };

    const observer = new ResizeObserver(updateMaxVisibleTags);
    observer.observe(cardEl);
    updateMaxVisibleTags();

    return () => observer.disconnect();
  }, []);

  const visibleTags = tags.slice(0, maxVisibleTags);
  const hiddenTags = tags.slice(maxVisibleTags);
  const extraCount = hiddenTags.length;

  return (
    <div className={styles.techTags} ref={containerRef}>
      {visibleTags.map((tech, i) => (
        <TechTag key={`${tech}-${i}`} techStack={tech} variant={variant} />
      ))}
      {extraCount > 0 && (
        <span
          className={`${styles.techTag} ${styles.counter}`}
          data-tooltip={hiddenTags.join(", ")}
          aria-label={`+${extraCount} more`}
        >
          +{extraCount}
        </span>
      )}
    </div>
  );
}
