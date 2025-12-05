import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1️⃣ Local backend for call-related APIs
      "/api": {
        target: "https://call-flow-l08x.onrender.com",
        changeOrigin: true,
        secure: false,
      },

      // 2️⃣ Remote backend for prompts
      "/prompts-api": {
        target: "https://api.aureya.in",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/prompts-api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
