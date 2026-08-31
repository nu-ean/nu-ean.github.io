import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hooks";
import { showToast } from "../../store/slices/toast-slice";
import { motion, useReducedMotion } from "motion/react";

import Icon from "../common/Icon";
import styles from "./Contact.module.css";
import iconStyle from "../common/Common.module.css";

export type Contact = {
  id: string;
  name: string;
  value: string;
  action: string;
};

export default function ContactItem({
  contact,
  index = 0,
}: {
  contact: Contact;
  index?: number;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const reduce = useReducedMotion();

  const handleClick = async () => {
    if (contact.id === "email") {
      const decodedValue = contact.value.replace(/\s*\[at\]\s*/gi, "@");

      // 이메일 계정 크롤링 방지
      await navigator.clipboard.writeText(decodedValue);
      dispatch(showToast(t("message.info.copied")));
    }

    if (contact.action === "link") {
      window.open(contact.value, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className={`${styles.contact} glass-card`}
      onClick={handleClick}
      title={t(`message.info.${contact.action}`)}
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      whileHover={!reduce ? { y: -2 } : undefined}
      whileTap={!reduce ? { scale: 0.98 } : undefined}
    >
      <div className={styles.iconBox}>
        <Icon id={contact.id} className={iconStyle.icon} />
      </div>
      <div className={styles.text}>{contact.name}</div>
    </motion.div>
  );
}
