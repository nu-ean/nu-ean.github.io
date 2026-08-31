import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "motion/react";
import styles from "./MainNavigation.module.css";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const staticPrefix = "<N";
  const insertedPart = "aeun";
  const staticSuffix = isHovered ? "Lee />" : ".Lee />";

  const insertedChars = insertedPart.split("");

  const insertedCharVariants = {
    hidden: { opacity: 0, width: 0, transition: { duration: 0.05 } },
    visible: { opacity: 1, width: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={styles.logo}
      onClick={() => navigate("/")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span className="flex items-center justify-center" initial={false}>
        <motion.span>{staticPrefix}</motion.span>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className="flex overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ staggerChildren: 0.03, when: "beforeChildren" }}
            >
              {insertedChars.map((char, index) => (
                <motion.span key={index} variants={insertedCharVariants}>
                  {/* 공백 문자는 레이아웃에 영향을 주지 않도록 non-breaking space로 처리 */}
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.span transition={{ duration: 0.2 }}>{staticSuffix}</motion.span>
      </motion.span>
    </motion.div>
  );
}
