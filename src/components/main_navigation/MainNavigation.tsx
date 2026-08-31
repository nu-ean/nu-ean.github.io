import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { setLanguage, type Language } from "../../store/slices/language-slice";
import { setTheme, type ThemeMode } from "../../store/slices/theme-slice";

import styles from "./MainNavigation.module.css";
import Logo from "./Logo";
import UtilButton from "./UtilButton";

const navItems = [
  { label: "About", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export default function MainNavigation() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // const currentLang = useAppSelector((state) => state.language.current);
  const currentTheme = useAppSelector((state) => state.theme.mode);

  // const handleToggleLanguage = () => {
  //   const newLang: Language = currentLang === "ko" ? "en" : "ko";
  //   dispatch(setLanguage(newLang));
  // };

  const handleToggleTheme = () => {
    const newTheme: ThemeMode = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Logo />
        </div>

        <nav className={styles.navArea}>
          <ul>
            {navItems.map((item) => {
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "underline-link underline-link-active"
                        : "underline-link"
                    }
                    end
                  >
                    {item.label.toLowerCase()}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.buttonArea}>
          {/* <UtilButton
          title={t("title.change-language")}
          onClick={handleToggleLanguage}
        >
          {currentLang.toUpperCase()}
        </UtilButton>
        | */}
          <UtilButton
            title={t("title.change-theme")}
            onClick={handleToggleTheme}
            style={{ fontSize: "1rem" }}
          >
            ◑
          </UtilButton>
        </div>
      </header>
    </div>
  );
}
