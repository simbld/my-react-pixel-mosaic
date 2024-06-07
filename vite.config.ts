import { defineConfig } from "vite";
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
      "@density": path.resolve(__dirname, "src/features/utils/density"),
      "@env": path.resolve(__dirname, "src/env"),
      "@features": path.resolve(__dirname, "src/features"),
      "@filters": path.resolve(__dirname, "src/features/utils/filters"),
      "@fonts": path.resolve(__dirname, "src/fonts"),
      "@gameboy": path.resolve(__dirname, "src/features/reducers/gameboy"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@hooks": path.resolve(__dirname, "src/features/hooks"),
      "@image": path.resolve(__dirname, "src/features/reducers/image"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@reducers": path.resolve(__dirname, "src/features/reducers"),
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
