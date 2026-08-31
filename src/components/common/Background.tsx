import styles from "./Common.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.blur}></div>
      <div className={styles.blur}></div>
      <div className={styles.blur}></div>
    </div>
  );
}
