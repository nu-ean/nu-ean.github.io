import type { ReactNode, ComponentPropsWithoutRef } from "react";
import styles from "./MainNavigation.module.css";

type UtilButtonProps = {
  title: string;
  onClick: () => void;
  children: ReactNode;
};

export default function UtilButton({
  title,
  onClick,
  children,
  ...props
}: UtilButtonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={styles.utilButton}
      {...props}
    >
      {children}
    </button>
  );
}
