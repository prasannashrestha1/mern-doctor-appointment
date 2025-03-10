import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5172,
    proxy: {
      "/api": {
        target: "https://mern-doctor-appointment-backend.onrender.com",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
