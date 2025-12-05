import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Calls API backend
      "/api": {
        target: "https://call-flow-l08x.onrender.com",
        changeOrigin: true,
        secure: false,
      },

      // Prompts API backend
      "/prompts-api": {
        target: "https://api.aureya.in",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/prompts-api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});