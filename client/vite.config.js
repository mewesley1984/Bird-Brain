import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://desolate-basin-48031-91eac769c520.herokuapp.com:" +
              process.env.PORT
            : "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
