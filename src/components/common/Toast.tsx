import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { close, selectToast } from "../../store/slices/toast-slice";
import styles from "./Common.module.css";

export default function Toast() {
  const dispatch = useAppDispatch();
  const { isOpen, message } = useAppSelector(selectToast);

  if (!isOpen || !message) {
    return null;
  }

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="true">
      <div
        className={styles.toast}
        role="status"
        onClick={() => dispatch(close())}
        title="닫기"
      >
        {message}
      </div>
    </div>
  );
}
