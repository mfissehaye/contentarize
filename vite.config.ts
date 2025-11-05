import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    build: {
      lib: {
        entry: "./src/index.ts",
        name: "Contentarize",
        fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
        formats: ["es", "cjs"],
      },
      cssCodeSplit: false,
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "react/jsx-runtime",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") {
              return "contentarize.css";
            }
            return assetInfo.name || "asset";
          },
        },
      },
    },
  };
});
