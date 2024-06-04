import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@common": path.resolve(__dirname, "src/features/common"),
      "@components": path.resolve(__dirname, "src/features/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@env": path.resolve(__dirname, "src/env"),
      "@features": path.resolve(__dirname, "src/features"),
      "@filters": path.resolve(__dirname, "src/features/filters"),
      "@reducers": path.resolve(__dirname, "src/features/reducers"),
      "@fonts": path.resolve(__dirname, "src/fonts"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@hooks": path.resolve(__dirname, "src/features/hooks"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@services": path.resolve(__dirname, "src/services"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/features/utils")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});
