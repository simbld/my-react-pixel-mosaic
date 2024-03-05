import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".cjs", ".js", ".jsx", ".json", ".ts", ".tsx"]
  }
});
