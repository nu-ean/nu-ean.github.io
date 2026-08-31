import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        replaceAttrValues: {
          "#000": "currentColor",
          "#000000": "currentColor",
          "#fff": "currentColor",
          "#ffffff": "currentColor",
        },
      },
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
});
