import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',  // รับ connection จากทุก interface
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/comshop/comshop-backoffice-backend/public'
      },
    }
  }
})
