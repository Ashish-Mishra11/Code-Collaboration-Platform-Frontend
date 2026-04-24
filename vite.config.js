import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    port: 3000,
    proxy: {
      // All REST API calls go through the API Gateway (port 8081)
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
      // OAuth2 flows go through the API Gateway
      '/oauth2': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
      '/login/oauth2': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
      // WebSocket for collab-service (port 8084) — SockJS endpoint
      '/collab': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
