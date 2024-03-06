import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";

export default defineConfig({
  plugins: [
    react(), // Ce plugin active déjà le support de JSX pour les fichiers .js et .jsx
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`
          // Importe automatiquement les styles CSS/LESS nécessaires.
        }
      ]
    })
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "src/less/index.less";`,
        javascriptEnabled: true
      }
    }
  },
  server: {
    hot: true,
    open: false
  },
  base: "/",
  build: {
    outDir: "build"
  }
});
