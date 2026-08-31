import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import i18n from "../i18n/i18n";

export const useAppSync = () => {
  const currentLang = useAppSelector((state) => state.language.current);
  const currentTheme = useAppSelector((state) => state.theme.mode);

  // 언어 동기화
  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang]);

  // 테마 동기화
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);
};
