import { Outlet } from "react-router-dom";

import Background from "../components/common/Background";
import MainNavigation from "../components/main_navigation/MainNavigation";
import Toast from "../components/common/Toast";
import { useAppSync } from "../hooks/useAppSync";

export default function RootLayout() {
  useAppSync();

  return (
    <>
      <Background />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Toast />
      <div className="version">v{__APP_VERSION__}</div>
    </>
  );
}
